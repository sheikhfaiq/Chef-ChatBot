import { NextRequest } from 'next/server';
import { ChatHistoryManager } from '@/lib/ai/chefService';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return Response.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      );
    }

    const historyManager = new ChatHistoryManager(sessionId);
    const history = historyManager.getHistory();
    const sessionInfo = historyManager.getSessionInfo();

    return Response.json({
      sessionId,
      messages: history,
      messageCount: history.length,
      createdAt: sessionInfo?.createdAt,
      updatedAt: sessionInfo?.updatedAt
    });

  } catch (error) {
    console.error('History API error:', error);
    return Response.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return Response.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    ChatHistoryManager.deleteSession(sessionId);

    return Response.json({
      success: true,
      message: 'Chat history cleared'
    });

  } catch (error) {
    console.error('Delete history error:', error);
    return Response.json(
      { error: 'Failed to delete history' },
      { status: 500 }
    );
  }
}
