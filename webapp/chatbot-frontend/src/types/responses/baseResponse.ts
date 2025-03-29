type BaseResponse<K extends "success" | "error", T> = {
  status: K;
} & T;

export default BaseResponse;
