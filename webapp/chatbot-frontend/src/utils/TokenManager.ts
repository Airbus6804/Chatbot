import server from "@/actions/server";
import { getCookie, setCookie } from "cookies-next";
import { JwtUtils, UserJwt } from "./jwtUtils";

class TokenManager {
    authToken: string | null = null;
    ownerChatTokens: Record<string, string> = {};
    guestChatTokens: Record<string, string> = {};

    jwtUtils = new JwtUtils();

    userInfo: UserJwt | null = null;

    constructor() {
        if (typeof window === "undefined")
            throw "Token manager can only be used on the client";

        this.ownerChatTokens = JSON.parse(
            localStorage.getItem("owner-chat-tokens") ?? "{}"
        );
        this.guestChatTokens = JSON.parse(
            localStorage.getItem("guest-chat-tokens") ?? "{}"
        );
    }

    async getAuthCookie() {
        if (!this.authToken) {
            this.authToken = (await getCookie("auth-token")) ?? null;

            if (this.authToken) {
                this.userInfo = this.jwtUtils.decodeAuthToken(this.authToken);
            }
        }

        return this.authToken;
    }

    async isAuthenticated() {
        return (await this.getAuthCookie()) !== null;
    }

    async setAuthToken(newToken: string) {
        this.authToken = newToken;
        this.userInfo = this.jwtUtils.decodeAuthToken(newToken);
        await setCookie("auth-token", newToken, { sameSite: false });
    }

    setChatToken(chatId: string, token: string, owner: boolean) {
        if (owner) {
            this.ownerChatTokens[chatId] = token;
            localStorage.setItem(
                `owner-chat-tokens`,
                JSON.stringify(this.ownerChatTokens)
            );
        } else {
            this.guestChatTokens[chatId] = token;
            localStorage.setItem(
                `guest-chat-tokens`,
                JSON.stringify(this.guestChatTokens)
            );
        }
    }

    #getChatToken(chatId: string, owner: boolean) {
        const key = owner ? "ownerChatTokens" : "guestChatTokens";
        if (this[key][chatId]) return this[key][chatId];

        return null;
    }

    async getChatToken(chatId: string, owner: boolean) {
        const token = this.#getChatToken(chatId, owner);

        if (token && this.jwtUtils.isChatTokenValid(token)) return token;

        const newToken = await server("getTokenForChat", { chatId, owner });
        if (newToken.status === "success") {
            this.setChatToken(chatId, newToken.chatToken, owner);
            return newToken.chatToken;
        }

        return false;
    }
}

export default TokenManager;
