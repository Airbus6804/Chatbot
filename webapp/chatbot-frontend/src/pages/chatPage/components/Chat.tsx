"use client";
import ChatMessage from "@/types/ChatMessage";
import TokenManager from "@/utils/TokenManager";
import { useState } from "react";
import ChatUi from "./ChatUi";
import { useParams } from "next/navigation";
import LLMStream from "@/utils/LLMStream";
import { ChatCreatedResponse } from "@/types/responses/chatResponses";
import { useRouter } from "next/navigation";

interface Props {
  defaultMessages: ChatMessage[];
  defaultChatId: null | string;
  owner: boolean;
}

export default function Chat({ defaultMessages, defaultChatId, owner }: Props) {
  const [messages, setMessages] = useState(defaultMessages);
  const [chatId, setChatId] = useState(defaultChatId);
  const params = useParams();
  const router = useRouter();

  const handleNewMessage = async (newMessage: string) => {
    const tokenManager = new TokenManager();
    await tokenManager.getAuthCookie();
    const email = tokenManager.userInfo!.email;

    setMessages((m) => [
      ...m,
      { loading: false, sender: email, text: newMessage },
      { loading: true, sender: "chatbot", text: "" },
    ]);

    console.log(chatId);

    if (!chatId) {
      const newChat = (await LLMStream.start<ChatCreatedResponse>(
        "/api/create-chat",
        { chat: newMessage }
      ))!;
      setChatId(newChat.chatId.toString());
      window.history.pushState(null, "", `/chat/${newChat.chatId}/owner`);
    } else {
      const tokenManager = new TokenManager();

      const token = await tokenManager.getChatToken(chatId, owner);

      console.log(token);

      if (token) {
        await LLMStream.start(`/api/chat/${chatId}`, {
          chat: newMessage,
          chatToken: token,
        });
      }
    }
    // else {
    //   const a = LLMStream.start('')
    // }
  };

  return (
    <div className="flex flex-col gap-8 h-dvh p-8 w-full">
      <ChatUi messages={messages} handleNewMessage={handleNewMessage} />
    </div>
  );
}
