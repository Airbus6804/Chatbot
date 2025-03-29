"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "./ChatMessage";
import IChatMessage from "@/types/ChatMessage";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  messages: IChatMessage[];
  handleNewMessage: (newMessage: string) => void;
}

export default function ChatUi({ messages, handleNewMessage }: Props) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendNewMessage = () => {
    handleNewMessage(newMessage);
    setNewMessage("");
  };

  const chatList = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatList.current) {
      chatList.current.scrollTo({
        top: chatList.current.scrollHeight,
      });
    }
  }, [messages]);

  return (
    <>
      <Card
        ref={chatList}
        style={{ backgroundColor: "#0e121c" }}
        className="flex-1 flex flex-col gap-8 relative isolate overflow-y-auto bg-input"
      >
        {messages.map((m, index) => (
          <ChatMessage data={m} key={index} />
        ))}
      </Card>

      <Textarea
        className="resize-none"
        placeholder="Il tuo messaggio"
        value={newMessage}
        onChange={(e) => {
          if (!e.isPropagationStopped()) setNewMessage(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && newMessage.length > 0) {
            e.preventDefault();
            return handleSendNewMessage();
          }
        }}
      ></Textarea>
      <Button disabled={newMessage.length === 0} onClick={handleSendNewMessage}>
        Invia
      </Button>
    </>
  );
}
