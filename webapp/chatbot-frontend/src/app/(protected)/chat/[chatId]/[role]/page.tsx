import ChatPage from "@/pages/chatPage/chatPage";
import ChatMessage from "@/types/ChatMessage";
import Fetcher from "@/utils/Fetcher";

export default async function Page({ params }: { params: any }) {
    const { chatId, role } = await params;

    return (
        <ChatPage
            defaultMessages={[]}
            defautlChatid={chatId}
            owner={role === "owner"}
        />
    );
}
