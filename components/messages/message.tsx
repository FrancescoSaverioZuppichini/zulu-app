import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";

const formatMessageTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Message({ message }: { message: UIMessage }) {
  const imageAttachments =
    message.experimental_attachments?.filter((attachment) =>
      attachment.contentType?.startsWith("image/")
    ) || [];

  return (
    <div key={message.id} className="space-y-1 mb-4">
      <div className="flex justify-center mb-2">
        <div className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">
          {new Date(message.createdAt || Date.now()).toLocaleDateString([], {
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
          {/* Image attachments */}
          {imageAttachments.length > 0 && (
            <div className="mb-2">
              {imageAttachments.map((attachment, index) => (
                <div key={`${message.id}-${index}`} className="mb-2 last:mb-0">
                  <img
                    src={attachment.url}
                    alt={attachment.name || "Image attachment"}
                    className="max-w-full h-auto rounded-lg shadow-sm"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Text content */}
          {message && (
            <MemoizedMarkdown content={message.content} id={message.id} />
          )}

          <div
            className={`text-[10px] ${
              message.role === "user" ? "text-blue-100" : "text-gray-500"
            } mt-1 text-right`}
          >
            {formatMessageTime(new Date(message.createdAt || Date.now()))}
          </div>
        </div>
      </div>
    </div>
  );
}
