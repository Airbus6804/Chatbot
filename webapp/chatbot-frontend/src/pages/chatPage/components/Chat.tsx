"use client";
import ChatMessage from "@/types/ChatMessage";
import TokenManager from "@/utils/TokenManager";
import { useEffect, useMemo, useState } from "react";
import ChatUi from "./ChatUi";
import { useParams } from "next/navigation";
import LLMStream from "@/utils/LLMStream";
import { ChatCreatedResponse } from "@/types/responses/chatResponses";
import { useRouter } from "next/navigation";
import server from "@/actions/server";

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
    const tokenManager = useMemo(() => new TokenManager(), [router]);

    useEffect(() => {
        (async () => {
            if (defaultChatId && defaultMessages.length === 0 && window) {
                const chatToken = await tokenManager.getChatToken(
                    defaultChatId,
                    owner
                );
                if (!chatToken) {
                    router.push("/chat");
                    return;
                }
                const chatHistory = await server("getExistingChat", {
                    chatId: defaultChatId,
                    chatToken,
                });
                if (chatHistory.status === "error") {
                    router.push("/chat");
                    return;
                }
                console.log(chatHistory);
                setMessages(chatHistory.chat);
            }
        })();
    }, [router]);

    const handleNewMessage = async (newMessage: string) => {
        await tokenManager.getAuthCookie();
        const email = tokenManager.userInfo!.email;

        setMessages((m) => [
            ...m,
            { loading: false, email: email, text: newMessage },
            { loading: true, email: "chatbot", text: "" },
        ]);

        console.log(chatId);

        if (!chatId) {
            const newChat = (await LLMStream.start<ChatCreatedResponse>(
                "/api/create-chat",
                { chat: newMessage }
            ))!;
            setChatId(newChat.chatId.toString());
            window.history.pushState(null, "", `/chat/${newChat.chatId}/owner`);
            tokenManager.setChatToken(
                newChat.chatId.toString(),
                newChat.chatToken,
                true
            );
        } else {
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

    const handleSendInvite = async (email: string) => {
        await server("inviteToChat", {
            email,
            chatId: chatId!,
            chatToken: (await tokenManager.getChatToken(
                chatId!,
                owner
            )) as string,
        });
    };

    return (
        <div className="flex flex-col gap-8 h-dvh p-8 w-full">
            <ChatUi
                chatId={chatId}
                messages={messages}
                handleNewMessage={handleNewMessage}
                handleSendInvite={handleSendInvite}
                owner={owner}
            />
        </div>
    );
}
