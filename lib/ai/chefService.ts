import { geminiClient } from './gemini';
import { CHEF_SYSTEM_PROMPT } from './prompt';
import { orderFunctionDeclarations, placeOrder } from './orderFunctions';
import { searchFunctionDeclarations, performWebSearch } from './searchFunctions';
import { ChatHistoryManager } from './chatHistory';

export async function* generateChefResponseStream(
  userMessage: string,
  sessionId: string
): AsyncGenerator<string> {
  const historyManager = new ChatHistoryManager(sessionId);

  try {

    historyManager.addMessage('user', userMessage);

    const model = geminiClient.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: CHEF_SYSTEM_PROMPT,
      tools: [{
        functionDeclarations: [
          ...orderFunctionDeclarations,
          ...searchFunctionDeclarations
        ]
      }]
    });


    const history = historyManager.getFormattedHistory();


    const chat = model.startChat({
      history: history.slice(0, -1)
    });

    console.log('Chat history length:', history.length - 1);


    const result = await chat.sendMessageStream(userMessage);

    let fullResponse = '';
    let functionCallDetected = false;


    for await (const chunk of result.stream) {
      const chunkText = chunk.text();


      const functionCalls = chunk.functionCalls();

      if (functionCalls && functionCalls.length > 0) {
        functionCallDetected = true;

        console.log('Function calls detected:', functionCalls.map(f => f.name));


        const functionResponses = await Promise.all(
          functionCalls.map(async (call) => {

            if (call.name === 'place_order') {
              console.log('Processing order:', call.args);
              const orderResult = await placeOrder(call.args);
              return {
                functionResponse: {
                  name: call.name,
                  response: orderResult
                }
              };
            }


            if (call.name === 'web_search') {
              console.log('Performing search:', call.args);
              const searchResult = await performWebSearch(call.args);
              return {
                functionResponse: {
                  name: call.name,
                  response: searchResult
                }
              };
            }

            return null;
          })
        );

        const validResponses = functionResponses.filter(r => r !== null);


        const finalResult = await chat.sendMessageStream(validResponses);

        for await (const finalChunk of finalResult.stream) {
          const finalText = finalChunk.text();
          if (finalText) {
            fullResponse += finalText;
            yield finalText;
          }
        }


        historyManager.addMessage('model', fullResponse);
        return;
      }


      if (chunkText) {
        fullResponse += chunkText;
        yield chunkText;
      }
    }


    if (!functionCallDetected && fullResponse) {
      historyManager.addMessage('model', fullResponse);
    }

  } catch (error) {
    console.error('Chef service streaming error:', error);
    const errorMessage = 'Sorry, I encountered an error. Please try again.';
    historyManager.addMessage('model', errorMessage);
    yield errorMessage;
  }
}


export async function generateChefResponse(
  userMessage: string,
  sessionId: string
): Promise<string> {
  let fullResponse = '';
  for await (const chunk of generateChefResponseStream(userMessage, sessionId)) {
    fullResponse += chunk;
  }
  return fullResponse;
}


export { ChatHistoryManager };
