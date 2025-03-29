import server from "@/actions/server";
import StoreTokenAndRedirect from "@/components/storeTokenAndRedirect";
import { PageProps } from "../../../../../.next/types/app/layout";

export default async function Page({ params }: PageProps) {
  const { token } = await params;

  const session = await server("emailVerify", { token });

  if (session.status === "error") throw session;

  return <StoreTokenAndRedirect redirectTo="/chat" token={token} />;
}
