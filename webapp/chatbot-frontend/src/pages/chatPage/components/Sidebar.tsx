import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Fetcher from "@/utils/Fetcher";
import Link from "next/link";

interface Props {
    chatId: string | null;
}

export default async function ChatPageSidebar({ chatId }: Props) {
    const fetcher = new Fetcher();
    const chats = (await fetcher.getChats()).data;

    return (
        <Sidebar collapsible="none" className="h-dvh">
            <SidebarHeader>Le tue chat</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href={"/chat"}>
                                    <SidebarMenuButton
                                        variant={chatId ? "default" : "outline"}
                                        className="whitespace-nowrap overflow-ellipsis p-2">
                                        Nuova Chat
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {chats.ownerChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Le tue chat</SidebarGroupLabel>
                        <SidebarGroupContent className={"gap-3 flex flex-col"}>
                            {chats.ownerChats.map((chat) => (
                                <SidebarMenu key={chat.id}>
                                    <SidebarMenuItem>
                                        <Link href={`/chat/${chat.id}/owner`}>
                                            <SidebarMenuButton
                                                variant={
                                                    chatId ===
                                                    chat.id.toString()
                                                        ? "outline"
                                                        : "default"
                                                }
                                                className="whitespace-nowrap overflow-ellipsis p-2">
                                                {chat.name}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
                {chats.guestChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Chat ospite</SidebarGroupLabel>
                        <SidebarGroupContent>
                            {chats.guestChats.map((chat) => (
                                <SidebarMenu key={chat.id}>
                                    <SidebarMenuItem>
                                        <Link href={`/chat/${chat.id}/guest`}>
                                            <SidebarMenuButton
                                                variant={
                                                    chatId ===
                                                    chat.id.toString()
                                                        ? "outline"
                                                        : "default"
                                                }
                                                className="whitespace-nowrap overflow-ellipsis p-2">
                                                {chat.name}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
        </Sidebar>
    );
}
