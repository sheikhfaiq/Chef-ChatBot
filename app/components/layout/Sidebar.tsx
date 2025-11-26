"use client"

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 flex flex-col">

      <div className="p-4 border-b border-blue-100">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors">
          <span className="text-xl">+</span>
          <span className="text-sm font-medium text-gray-700">New Chat</span>
        </button>
      </div>


      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors text-sm flex items-center gap-2">
          <span>🔍</span>
          <span>Search Chats</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors text-sm flex items-center gap-2">
          <span>📚</span>
          <span>Library</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors text-sm flex items-center gap-2">
          <span>📁</span>
          <span>Projects</span>
        </button>

        <div className="my-4 border-t border-blue-100"></div>


        <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Your Chats</div>
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors text-sm truncate">
          Chef Chatbot Roadmap
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors text-sm truncate">
          Shopify Automation
        </button>
      </nav>


      <div className="p-4 border-t border-blue-100">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}
