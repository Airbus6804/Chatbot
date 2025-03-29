import BaseResponse from "@/types/responses/baseResponse";
import {
    ChatCreatedResponse,
    ChatDoneResponse,
    ChatHistoryResponse,
    ChatInProgressResponse,
    Chats,
} from "@/types/responses/chatResponses";
import { ErrorResponse } from "@/types/responses/errorResponse";
import {
    AuthTokenResponse,
    ChatTokenResponse,
} from "@/types/responses/tokenResponses";
import axios, { AxiosError, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtUtils } from "./jwtUtils";

export type FetcherExcludedKeys =
    | "fetch"
    | "url"
    | "axios"
    | "authenticatedAxios"
    | "jwtUtils"
    | "createChat"
    | "chat";
class Fetcher {
    axios = axios.create({
        baseURL: "http://api:5293/",
        validateStatus: () => true,
    });
    authenticatedAxios = axios.create({
        baseURL: "http://api:5293/",
        validateStatus: () => true,
    });

    jwtUtils = new JwtUtils();

    constructor() {
        this.authenticatedAxios.interceptors.request.use(async (config) => {
            const axiosCookies = await cookies();
            const token = axiosCookies.get("auth-token")?.value;

            if (!token) {
                redirect("/login");
            }

            if (this.jwtUtils.decodeAuthToken(token).hasExpired) {
                redirect("/login");
            }

            this.jwtUtils.decodeAuthToken(token);

            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        this.authenticatedAxios.interceptors.response.use(async (response) => {
            const data = response.data as
                | BaseResponse<"success", Record<string, any>>
                | ErrorResponse;

            if (data.status === "success") return response;

            if (data.error === "Unauthorized") {
                redirect("/login");
                //Compiler happy
                return response;
            }

            //Compiler happy
            return response;
        });
    }

    async login(params: { email: string; password: string }) {
        const data = await this.axios.post<AuthTokenResponse | ErrorResponse>(
            "/login",
            params
        );
        return data;
    }

    async register(params: { email: string; password: string }) {
        const data = await this.axios.post<
            BaseResponse<"success", {}> | ErrorResponse
        >("/register", params);
        return data;
    }

    async inviteToChat(params: {
        email: string;
        chatToken: string;
        chatId: string;
    }) {
        const data = await this.authenticatedAxios.post(
            `/chat/${params.chatId}/invite`,
            { emailTo: params.email },
            { headers: { "Chat-Auth-Token": params.chatToken } }
        );
        return data;
    }

    async acceptInviteToChat(params: { token: string }) {
        const data = await this.authenticatedAxios.get<ChatTokenResponse>(
            `/chat/invite/accept/${params.token}`
        );
        return data;
    }

    async emailVerify(params: { token: string }) {
        const data = await this.axios.get<AuthTokenResponse>(
            `/email_verify/${params.token}`
        );
        return data;
    }

    async getTokenForChat(params: { chatId: string; owner: boolean }) {
        console.log("getting token");
        const data = await this.authenticatedAxios.get<ChatTokenResponse>(
            `/chat/${params.chatId}/session${!params.owner ? "/guest" : ""}`
        );
        console.log(data);
        return data;
    }

    async getExistingChat(params: { chatId: string; chatToken: string }) {
        const data = await this.authenticatedAxios.get<ChatHistoryResponse>(
            `/chat/${params.chatId}`,
            { headers: { "Chat-Auth-Token": params.chatToken } }
        );

        return data;
    }

    async createChat(params: { chat: string }) {
        const data = await this.authenticatedAxios.post<
            ReadableStream<ChatCreatedResponse | ChatInProgressResponse>
        >("/create-chat", { chat: params.chat }, { responseType: "stream" });

        return data.data;
    }

    async chat(params: { chat: string; chatId: string; chatToken: string }) {
        const data = await this.authenticatedAxios.post<
            ReadableStream<ChatDoneResponse | ChatInProgressResponse>
        >(
            `/chat/${params.chatId}`,
            { chat: params.chat },
            {
                responseType: "stream",
                headers: { "Chat-Auth-Token": params.chatToken },
            }
        );

        console.log(params);

        return data.data;
    }

    async getChats() {
        const data = await this.authenticatedAxios.get<Chats>("/chats");
        return data;
    }

    async fetch<
        T extends (
            ...args: any
        ) => ReturnType<Fetcher[Exclude<keyof Fetcher, FetcherExcludedKeys>]>
    >(method: T): Promise<Awaited<ReturnType<T>>["data"] | ErrorResponse> {
        try {
            return (await method()).data;
        } catch (err) {
            if (isAxiosError(err)) {
                if (!err.response)
                    return { error: "Generic Error", status: "error" };
                return err.response.data;
            }

            return err as ErrorResponse;
        }
    }
}

export default Fetcher;
