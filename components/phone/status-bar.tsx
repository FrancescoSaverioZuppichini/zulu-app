import { Battery, Signal, Wifi } from "lucide-react"

export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="flex justify-between items-center px-6 py-1 text-xs">
      <div>{currentTime}</div>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  )
}
