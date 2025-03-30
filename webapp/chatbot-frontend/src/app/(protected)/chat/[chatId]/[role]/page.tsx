import ChatPage from "@/pagesComponents/chatPage/chatPage";

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
