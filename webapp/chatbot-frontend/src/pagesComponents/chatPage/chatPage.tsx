import { SidebarProvider } from "@/components/ui/sidebar";
import ChatMessage from "@/types/ChatMessage";
import Chat from "./components/Chat";
import ChatPageSidebar from "./components/Sidebar";

interface Props {
    defaultMessages: ChatMessage[];
    defautlChatid: null | string;
    owner: boolean;
}

export default function ChatPage({
    defaultMessages,
    defautlChatid,
    owner,
}: Props) {
    return (
        <div>
            <SidebarProvider>
                <ChatPageSidebar chatId={defautlChatid} />
                <Chat
                    defaultMessages={defaultMessages}
                    defaultChatId={defautlChatid}
                    owner={owner}
                />
            </SidebarProvider>
        </div>
    );
}
