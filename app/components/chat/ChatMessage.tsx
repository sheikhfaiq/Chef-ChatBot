"use client"

interface ChatMessageProps {
  message: string
  from: "user" | "bot"
}

export default function ChatMessage({ message, from }: ChatMessageProps) {
  return (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg whitespace-pre-wrap break-words text-sm leading-relaxed ${
          from === "user"
            ? "bg-blue-600 text-white rounded-br-none shadow-md"
            : "bg-white text-gray-800 border border-blue-100 rounded-bl-none shadow-sm"
        }`}
      >
        {message}
      </div>
    </div>
  )
}
