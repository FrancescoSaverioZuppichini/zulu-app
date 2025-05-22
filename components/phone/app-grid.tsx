import Link from "next/link"
import { MessageSquare, Users } from "lucide-react"

export function AppGrid() {
  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-3">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* App Icons Grid */}
        <div className="grid grid-cols-4 gap-4  w-full max-w-md mx-auto mt-4">
          <Link href="/messages">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center aspect-square w-full rounded-2xl bg-gradient-to-b from-green-400 to-green-600 shadow-md">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <span className="text-[10px] mt-1 text-black font-medium">Messages</span>
            </div>
          </Link>
          <Link href="/contacts">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center aspect-square w-full rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 shadow-md">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="text-[10px] mt-1 text-black font-medium">Contacts</span>
            </div>
          </Link>
        </div>
      </div>

      {/* iOS-style Bottom Dock */}
      <div className="w-full flex justify-center">
        <div className="bg-black/50 backdrop-blur-xl rounded-[28px] p-3 max-w-xs w-full border border-white/10 shadow-lg shadow-black/20 flex justify-around">
          <div className="grid grid-cols-4 gap-4 p-1 w-full h-auto">
            <Link href="/messages">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center aspect-square w-full rounded-xl bg-gradient-to-b from-green-400 to-green-600 shadow-md">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
              </div>
            </Link>
            <Link href="/contacts">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center aspect-square w-full rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 shadow-md">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}