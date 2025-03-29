import StoreTokenAndRedirect from "@/components/storeTokenAndRedirect";
import { PageProps } from "../../../../../../../.next/types/app/layout";

export default async function Page({ params, searchParams }: PageProps) {
  const { token } = await params;

  return <StoreTokenAndRedirect redirectTo="/chat" token={token} />;
}
