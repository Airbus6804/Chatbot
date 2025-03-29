import StoreTokenAndRedirect from "@/components/storeTokenAndRedirect";
import { PageProps } from "../../../../../../../.next/types/app/layout";
import server from "@/actions/server";
import StoreChatTokenAndRedirect from "@/components/storeChatTokenAndRedirect";

export default async function Page({ params }: PageProps) {
    const { token } = await params;

    const invitation = await server("acceptInviteToChat", { token });

    if (invitation.status === "error") {
        return <div>Invalid Token</div>;
    }

    return (
        <StoreChatTokenAndRedirect owner={false} token={invitation.chatToken} />
    );
}
