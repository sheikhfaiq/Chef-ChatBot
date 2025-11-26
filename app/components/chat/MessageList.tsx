"use client"

import { useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"

interface Message {
  id: string
  text: string
  from: "user" | "bot"
}

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-white via-blue-50/30 to-white scroll-smooth"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍🍳</span>
            </div>
            <p className="text-gray-500 font-medium">Start your conversation</p>
            <p className="text-xs text-gray-400 mt-2">Ask me anything about cooking!</p>
          </div>
        </div>
      ) : (
        messages.map((msg) => <ChatMessage key={msg.id} message={msg.text} from={msg.from} />)
      )}
    </div>
  )
}
