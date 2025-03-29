import BaseResponse from "@/types/responses/baseResponse";
import { ErrorResponse } from "@/types/responses/errorResponse";
import { AuthTokenResponse } from "@/types/responses/tokenResponses";
import axios, { AxiosError } from "axios";

class Fetcher {
  url = "http://api:5293/";

  async login(params: { email: string; password: string }) {
    const data = await axios.post<any, AuthTokenResponse | ErrorResponse>(
      this.url + "login",
      params
    );
    return data;
  }

  async register(params: { email: string; password: string }) {
    const data = await axios.post<
      any,
      BaseResponse<"success", {}> | ErrorResponse
    >(this.url + "register", params);
    return data;
  }

  async emailVerify(params: { token: string }) {
    const data = await axios.get<any, AuthTokenResponse>(
      this.url + `email_verify/${params.token}`
    );
    return data;
  }

  async fetch<T extends () => Promise<any>>(
    method: T
  ): Promise<ReturnType<Awaited<T>> | ErrorResponse> {
    try {
      return (await method()).data;
    } catch (err) {
      return (err as AxiosError).response!.data as ErrorResponse;
    }
  }
}

const fetcher = new Fetcher();

export default fetcher;
