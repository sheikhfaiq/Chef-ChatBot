"use client"

interface SidebarProps {
  onClearHistory?: () => void
  sessionId?: string
}

export default function Sidebar({ onClearHistory, sessionId }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">

      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Chef Maria Bot</h1>
        <p className="text-xs text-gray-500 mt-1">
          {sessionId ? `Session: ${sessionId.slice(0, 15)}...` : 'New Session'}
        </p>
      </div>


      <nav className="flex-1 space-y-2">
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          💬 Current Chat
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          📝 Recipe Ideas
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          🛒 My Orders
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          ⭐ Favorites
        </button>
      </nav>


      {onClearHistory && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={onClearHistory}
            className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
          >
            🗑️ Clear History
          </button>
        </div>
      )}


      <div className="mt-4 text-xs text-gray-400 text-center">
        Powered by Gemini AI
      </div>
    </aside>
  )
}
