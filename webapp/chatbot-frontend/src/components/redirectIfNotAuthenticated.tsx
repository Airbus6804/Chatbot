"use client";

import TokenManager from "@/utils/TokenManager";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function RedirectIfNotAuthenticated({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const tokens = new TokenManager();
    if (!tokens.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return children;
}
