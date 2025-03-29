import server from "@/actions/server";
import { PageProps } from "../../../../../.next/types/app/(email_links)/email_verify/[token]/page";
import StoreTokenAndRedirect from "@/components/storeTokenAndRedirect";

export default async function Page({ params }: PageProps) {
  const { token } = await params;

  const session = await server("emailVerify", { token });

  if (session.status === "error") throw session;

  return <StoreTokenAndRedirect redirectTo="/chat" token={token} />;
}
