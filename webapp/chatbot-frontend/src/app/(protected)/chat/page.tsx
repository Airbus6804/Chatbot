import ChatPage from "@/pagesComponents/chatPage/chatPage";

export const dynamic = "force-dynamic";

export default function Page() {
    return <ChatPage defaultMessages={[]} defautlChatid={null} owner />;
}
