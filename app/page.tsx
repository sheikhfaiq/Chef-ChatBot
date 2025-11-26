"use client"

import { useState, useEffect, useRef } from "react"
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
  const [sessionId, setSessionId] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  useEffect(() => {
    const loadHistory = async () => {

      const storedSessionId = localStorage.getItem('chatSessionId')

      if (storedSessionId) {
        setSessionId(storedSessionId)

        try {
          const response = await fetch(`/api/chat/history?sessionId=${storedSessionId}`)
          const data = await response.json()

          if (data.messages && data.messages.length > 0) {

            const loadedMessages: Message[] = data.messages.map((msg: any) => ({
              id: crypto.randomUUID(),
              text: msg.parts[0].text,
              from: msg.role === 'user' ? 'user' : 'bot'
            }))
            setMessages(loadedMessages)
          }
        } catch (error) {
          console.error('Failed to load history:', error)
        }
      }
    }

    loadHistory()
  }, [])


  const clearHistory = async () => {
    if (!sessionId) {
      setMessages([])
      return
    }

    try {
      await fetch('/api/chat/history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      setMessages([])
      localStorage.removeItem('chatSessionId')
      setSessionId('')
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }

  const sendMessage = async (message: string) => {

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      from: "user"
    }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)


    const botMessageId = crypto.randomUUID()
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      from: "bot"
    }
    setMessages((prev) => [...prev, botMessage])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sessionId: sessionId || undefined
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch')
      }


      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let accumulatedText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)

            try {
              const parsed = JSON.parse(data)


              if (parsed.type === 'session') {
                setSessionId(parsed.sessionId)
                localStorage.setItem('chatSessionId', parsed.sessionId)
              }


              if (parsed.type === 'chunk' && parsed.chunk) {
                accumulatedText += parsed.chunk


                setMessages((prev) => {
                  const updated = [...prev]
                  const lastMessage = updated[updated.length - 1]
                  if (lastMessage.from === 'bot') {
                    lastMessage.text = accumulatedText
                  }
                  return updated
                })
              }

              // Handle completion
              if (parsed.type === 'done') {
                setLoading(false)
              }

              // Handle errors
              if (parsed.type === 'error') {
                console.error('Stream error:', parsed.error)
                setMessages((prev) => {
                  const updated = [...prev]
                  const lastMessage = updated[updated.length - 1]
                  if (lastMessage.from === 'bot') {
                    lastMessage.text = 'Error: Failed to get response'
                  }
                  return updated
                })
                setLoading(false)
              }
            } catch (e) {
              console.error('Parse error:', e)
            }
          }
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      setMessages((prev) => {
        const updated = [...prev]
        const lastMessage = updated[updated.length - 1]
        if (lastMessage.from === 'bot') {
          lastMessage.text = 'Network error: Please try again'
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar onClearHistory={clearHistory} sessionId={sessionId} />
      <ChatArea>
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
        <MessageInput onSend={sendMessage} disabled={loading} />
      </ChatArea>
    </div>
  )
}
