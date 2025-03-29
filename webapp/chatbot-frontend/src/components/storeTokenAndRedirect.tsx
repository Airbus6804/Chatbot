"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TokenManager from "@/utils/TokenManager";

interface Props {
  token: string;
  redirectTo: string;
}

export default function StoreTokenAndRedirect({ redirectTo, token }: Props) {
  const router = useRouter();

  useEffect(() => {
    new TokenManager().setAuthToken(token);
    router.push(redirectTo);
  }, [router]);

  return <></>;
}
