"use client"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-white text-gray-600 p-4 text-center text-sm border-t border-blue-100 shadow-inner">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">ChefBot</span>. All rights reserved.
      </p>
      <p className="text-xs text-gray-500 mt-1">AI-powered culinary assistant</p>
    </footer>
  )
}
