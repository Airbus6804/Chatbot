"use server";

import fetcher from "@/utils/Fetcher";

async function server<T extends Exclude<keyof typeof fetcher, "fetch" | "url">>(
  endpoint: T,
  params: Parameters<(typeof fetcher)[T]>[0]
) {
  //@ts-expect-error
  const response = await fetcher.fetch(() => fetcher[endpoint](params));
  return response;
}

export default server;
