
import type { ReactNode } from "react";

interface TerminalContainerProps {
  children: ReactNode;
}

export function TerminalContainer({ children }: TerminalContainerProps) {
  return (
    <div className="bg-black border-4 border-green-500 rounded-lg shadow-lg w-full max-w-2xl h-[600px] overflow-hidden font-mono">
      <div className="bg-green-500 text-black px-4 py-2 font-bold">
        ZULU TERMINAL
      </div>
      <div className="p-4 text-green-500">
        {children}
      </div>
    </div>
  );
}
