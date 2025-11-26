import { NextRequest, NextResponse } from 'next/server';
import { generateChefResponse } from '@/lib/ai/chefService';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "message" in request body' },
        { status: 400 }
      );
    }

    const reply = await generateChefResponse(message);

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
