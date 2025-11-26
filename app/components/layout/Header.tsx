"use client"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 text-center font-bold text-2xl shadow-lg border-b border-blue-400/30">
      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold">✨</span>
        </div>
        <span className="bg-gradient-to-r from-white to-blue-50 bg-clip-text text-transparent">ChefBot Chat</span>
      </div>
      <p className="text-blue-100 text-xs mt-2 font-normal">Powered by AI</p>
    </header>
  )
}
