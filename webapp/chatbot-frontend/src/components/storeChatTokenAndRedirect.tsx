"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TokenManager from "@/utils/TokenManager";
import { JwtUtils } from "@/utils/jwtUtils";

interface Props {
    token: string;
    owner: boolean;
}

export default function StoreChatTokenAndRedirect({ token, owner }: Props) {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (!window) return;
            const tokenManager = new TokenManager();
            const jwtUtils = new JwtUtils();

            const tokenId = jwtUtils.getChatTokenId(token);

            tokenManager.setChatToken(tokenId, token, owner);

            router.push(`/chat/${tokenId}/${owner ? "owner" : "guest"}`);
        })();
    }, [router]);

    return <></>;
}
