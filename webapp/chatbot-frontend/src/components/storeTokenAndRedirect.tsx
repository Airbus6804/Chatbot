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
        if (!window) return;
        new TokenManager()
            .setAuthToken(token)
            .then(() => router.push(redirectTo));
    }, [router]);

    return <></>;
}
