import { decode, JwtPayload } from "jsonwebtoken";

export interface UserJwt {
    email: string;
    expiresIn: number;
    hasExpired: boolean;
}

export class JwtUtils {
    JWT_EMAIL_TTL = 86400;
    JWT_AUTH_TTL = 3600;
    JWT_CHAT_TTL = 1800;

    decodeAuthToken(token: string): UserJwt {
        const decodedToken = decode(token) as JwtPayload;

        const expiresIn = (decodedToken.iat! + this.JWT_AUTH_TTL) * 1000;

        return {
            email: decodedToken.email,
            expiresIn,
            hasExpired: Date.now() >= expiresIn,
        };
    }

    getChatTokenId(chatToken: string): string {
        const decodedToken = decode(chatToken) as JwtPayload;
        return decodedToken.chatId;
    }

    isChatTokenValid(chatToken: string): boolean {
        const decodedToken = decode(chatToken) as JwtPayload;
        const expiresIn = (decodedToken.iat! + this.JWT_CHAT_TTL) * 1000;
        return expiresIn > Date.now();
    }
}
