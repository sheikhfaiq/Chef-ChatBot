import { ChatMessage, ChatSession } from './types';
const chatSessions = new Map<string, ChatSession>();

export class ChatHistoryManager {
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;


    if (!chatSessions.has(sessionId)) {
      chatSessions.set(sessionId, {
        sessionId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }


  addMessage(role: 'user' | 'model', text: string): void {
    const session = chatSessions.get(this.sessionId);
    if (!session) return;

    session.messages.push({
      role,
      parts: [{ text }]
    });
    session.updatedAt = new Date();
  }


  getHistory(): ChatMessage[] {
    const session = chatSessions.get(this.sessionId);
    return session?.messages || [];
  }


  getFormattedHistory(): ChatMessage[] {
    return this.getHistory();
  }


  clearHistory(): void {
    const session = chatSessions.get(this.sessionId);
    if (session) {
      session.messages = [];
      session.updatedAt = new Date();
    }
  }


  getSessionInfo(): ChatSession | undefined {
    return chatSessions.get(this.sessionId);
  }


  static deleteSession(sessionId: string): void {
    chatSessions.delete(sessionId);
  }


  static getAllSessions(): Map<string, ChatSession> {
    return chatSessions;
  }
}
