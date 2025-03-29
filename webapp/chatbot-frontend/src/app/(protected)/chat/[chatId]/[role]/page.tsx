import ChatPage from "@/pages/chatPage/chatPage";
import ChatMessage from "@/types/ChatMessage";

export default async function Page({ params }: { params: any }) {
  //fetch messages
  const messages: ChatMessage[] = [];

  const { chatId, role } = await params;

  return (
    <ChatPage
      defaultMessages={messages}
      defautlChatid={chatId}
      owner={role === "owner"}
    />
  );
}
