"use server";

import { ErrorResponse } from "@/types/responses/errorResponse";
import Fetcheretcher from "@/utils/Fetcher";
import Fetcher, { FetcherExcludedKeys } from "@/utils/Fetcher";

async function server<
  T extends Exclude<keyof typeof fetcher, FetcherExcludedKeys>
>(endpoint: T, params: Parameters<Fetcher[T]>[0]) {
  const fetcher = new Fetcheretcher();

  //@ts-expect-error
  const response = await fetcher.fetch<(typeof fetcher)[T]>(() => {
    //@ts-expect-error
    return fetcher[endpoint](params);
  });
  return response;
}

export default server;
