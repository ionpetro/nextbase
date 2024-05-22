import type { Message } from "ai";

import { Separator } from "@/components/ui/separator";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "./ui/scroll-area";

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto px-4 max-w-3xl mb-32">
      <ScrollArea className="h-[calc(100vh-350px)]">
        {messages.map((message, index) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
