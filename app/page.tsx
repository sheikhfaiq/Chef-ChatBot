"use client"

import { useState } from "react"
import Sidebar from "@/app/components/layout/Sidebar"
import ChatArea from "@/app/components/layout/ChatArea"
import MessageList from "@/app/components/chat/MessageList"
import MessageInput from "@/app/components/chat/MessageInput"

type Message = {
  id: string
  text: string
  from: "user" | "bot"
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: message, from: "user" }])
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: data.reply, from: "bot" }])
      } else {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: "Error: " + data.error, from: "bot" }])
      }
    } catch {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: "Network error", from: "bot" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <ChatArea>
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} disabled={loading} />
      </ChatArea>
    </div>
  )
}
