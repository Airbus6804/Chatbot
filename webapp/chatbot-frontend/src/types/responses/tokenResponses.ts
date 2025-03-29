import BaseResponse from "./baseResponse";

export type AuthTokenResponse = BaseResponse<"success", { token: string }>;
export type ChatTokenResponse = BaseResponse<"success", { chatToken: string }>;
