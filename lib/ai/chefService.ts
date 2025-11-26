import { geminiClient } from './gemini';
import { CHEF_SYSTEM_PROMPT } from './prompt';
import { orderFunctionDeclarations, placeOrder } from './orderFunctions';
import { searchFunctionDeclarations, performWebSearch } from './searchFunctions';

export async function generateChefResponse(userMessage: string): Promise<string> {
  try {
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

    const chat = model.startChat();

    const result = await chat.sendMessage(userMessage);
    const response = result.response;

    const functionCalls = response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      const functionResponses = await Promise.all(
        functionCalls.map(async (call) => {
          // Handle order placement
          if (call.name === 'place_order') {
            const orderResult = await placeOrder(call.args);
            return {
              functionResponse: {
                name: call.name,
                response: orderResult
              }
            };
          }

          // Handle web search
          if (call.name === 'web_search') {
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


      const finalResult = await chat.sendMessage(validResponses);
      const finalResponse = finalResult.response;

      return finalResponse.text() || 'Response processed.';
    }

    return response.text() || 'Sorry, no reply from ChefBot.';
  } catch (error) {
    console.error('Chef service error:', error);
    throw new Error('Failed to generate chef response');
  }
}
