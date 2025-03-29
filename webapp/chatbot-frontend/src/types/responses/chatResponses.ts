import ChatMessage from "../ChatMessage";
import BaseResponse from "./baseResponse";
import { ChatTokenResponse } from "./tokenResponses";

export type ChatCreatedResponse = ChatTokenResponse & {
    chatId: number;
    done: true;
};
export type ChatDoneResponse = BaseResponse<"success", { done: true }>;
export type ChatInProgressResponse = { content: string; done: false };

export type Chats = BaseResponse<
    "success",
    {
        ownerChats: [{ name: string; id: number }];
        guestChats: [{ name: string; id: number }];
    }
>;

export type ChatHistoryResponse = BaseResponse<
    "success",
    { id: string; chat: ChatMessage[] }
>;
