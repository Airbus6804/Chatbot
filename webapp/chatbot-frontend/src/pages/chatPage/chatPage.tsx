import { SidebarProvider } from "@/components/ui/sidebar";
import ChatPageSidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import ChatMessage from "@/types/ChatMessage";
import { useParams } from "next/navigation";

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
        <ChatPageSidebar />
        <Chat
          defaultMessages={defaultMessages}
          defaultChatId={defautlChatid}
          owner={owner}
        />
      </SidebarProvider>
    </div>
  );
}
