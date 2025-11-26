"use client"

import type React from "react"

interface ChatContainerProps {
  children: React.ReactNode
}

export default function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden border border-blue-100">
      {children}
    </div>
  )
}
