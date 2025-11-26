"use client"

import type React from "react"

interface ChatAreaProps {
  children: React.ReactNode
}

export default function ChatArea({ children }: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Header */}
      <div className="border-b border-blue-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">ChefBot Chat</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Upgrade to Go
          </button>
          <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 transition-colors">⋮</button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
