import BaseResponse from "./baseResponse";
import { ChatTokenResponse } from "./tokenResponses";

export type ChatCreatedResponse = ChatTokenResponse & {
  chatId: number;
  done: true;
};
export type ChatResponse = BaseResponse<"success", { done: true }>;
