"use client"

import React, { type KeyboardEvent } from "react"

interface MessageInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [input, setInput] = React.useState("")

  const handleSend = () => {
    const trimmed = input.trim()
    if (trimmed) {
      onSend(trimmed)
      setInput("")
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex gap-3 p-4 border-t border-blue-100 bg-white">
      <div className="flex-1 flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask ChefBot anything... (Shift+Enter for new line)"
          disabled={disabled}
          rows={2}
          className="flex-1 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none hover:bg-blue-50/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        />
        <button
          onClick={handleSend}
          disabled={disabled || input.trim() === ""}
          className={`px-4 py-3 rounded-lg font-medium transition-all h-fit flex items-center justify-center ${
            disabled || input.trim() === ""
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg active:scale-95"
          }`}
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
