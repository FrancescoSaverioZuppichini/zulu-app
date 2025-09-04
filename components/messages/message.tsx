import { cn } from "@/lib/utils";
import { MyUIMessage } from "@/lib/types";
import { MessagePart } from "./message-part";

const formatMessageTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Message({ message }: { message: MyUIMessage }) {
  const createdAt = message.metadata?.createdAt as Date || new Date();

  return (
    <div key={message.id} className="space-y-1 mb-4">
      <div className="flex justify-center mb-2">
        <div className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">
          {new Date(createdAt).toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div
        className={cn(
          "flex",
          message.role === "user" ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={`max-w-[80%] px-3 py-2 rounded-2xl ${
            message.role === "user"
              ? "bg-blue-500 text-white rounded-tr-sm"
              : "bg-gray-300 text-black rounded-tl-sm"
          }`}
        >
          {message.parts.map((part, index) => (
            <MessagePart key={`${message.id}-${index}`} part={part} id={message.id} />
          ))}

          <div
            className={`text-[10px] ${
              message.role === "user" ? "text-blue-100" : "text-gray-500"
            } mt-1 text-right`}
          >
            {formatMessageTime(new Date(createdAt))}
          </div>
        </div>
      </div>
    </div>
  );
}
