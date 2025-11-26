import { NextRequest } from 'next/server';
import { generateChefResponseStream, ChatHistoryManager } from '@/lib/ai/chefService';

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Invalid or missing "message"' },
        { status: 400 }
      );
    }


    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('Processing message for session:', currentSessionId);


    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {

          const sessionData = `data: ${JSON.stringify({
            type: 'session',
            sessionId: currentSessionId
          })}\n\n`;
          controller.enqueue(encoder.encode(sessionData));


          for await (const chunk of generateChefResponseStream(message, currentSessionId)) {
            const data = `data: ${JSON.stringify({
              type: 'chunk',
              chunk
            })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }


          const doneData = `data: ${JSON.stringify({ type: 'done' })}\n\n`;
          controller.enqueue(encoder.encode(doneData));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = `data: ${JSON.stringify({
            type: 'error',
            error: 'Streaming failed'
          })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: unknown) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
