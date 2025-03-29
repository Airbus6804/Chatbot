import BaseResponse from "./baseResponse";

export type ErrorResponse = BaseResponse<"error", { error: string }>;
