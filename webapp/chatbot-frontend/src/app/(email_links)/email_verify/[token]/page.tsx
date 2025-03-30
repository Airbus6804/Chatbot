import server from "@/actions/server";
import StoreTokenAndRedirect from "@/components/storeTokenAndRedirect";

export default async function Page({ params }: any) {
    const { token } = await params;

    const session = await server("emailVerify", { token });

    if (session.status === "error") throw session;

    return <StoreTokenAndRedirect redirectTo="/chat" token={session.token} />;
}

export const dynamic = "force-dynamic";
