import type { ReactNode } from "react"

interface PhoneContainerProps {
  children: ReactNode
}

export function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className="relative mx-auto bg-black rounded-[3rem] h-[600px] w-[300px] shadow-xl overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-10"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white m-2 rounded-[2.5rem] overflow-hidden">
        {children}
      </div>
    </div>
  )
}
