"use client"

import { useEffect, useRef } from "react"

type Message = {
  id: string
  text: string
  from: "user" | "bot"
}

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍🍳</div>
          <p className="text-lg font-medium">Welcome to Chef Maria!</p>
          <p className="text-sm mt-2">Ask me about recipes, place orders, or search for culinary info</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
              msg.from === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>


            {msg.from === "bot" && msg.text === "" && (
              <span className="inline-block w-2 h-4 ml-1 bg-gray-600 animate-pulse" />
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
