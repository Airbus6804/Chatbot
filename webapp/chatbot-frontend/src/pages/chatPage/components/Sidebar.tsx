import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import Fetcher from "@/utils/Fetcher";

export default async function ChatPageSidebar() {
  const fetcher = new Fetcher();
  console.log((await fetcher.getChats()).data.ownerChats);

  return (
    <Sidebar>
      <SidebarHeader>Le tue chat</SidebarHeader>
    </Sidebar>
  );
}
