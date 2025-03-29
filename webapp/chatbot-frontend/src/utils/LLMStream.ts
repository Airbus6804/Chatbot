import {
  ChatDoneResponse,
  ChatInProgressResponse,
} from "@/types/responses/chatResponses";

import { encode, decode } from "html-entities";

export default class LLMStream {
  constructor() {}

  static async start<T extends ChatDoneResponse>(
    url: string,
    body: { chat: string; chatToken?: string },
    callback?: (chunk: ChatInProgressResponse) => void
  ) {
    console.log("llm stream", url);

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    let done = true;

    while (done) {
      const read = await reader!.read();
      console.log(read);
      done = !read.done;

      const text = decoder.decode(read.value!);

      console.log("text:", text);

      const data = JSON.parse(text) as ChatInProgressResponse | T;

      if (!data.done) {
        if (callback) callback(data);
        const event = new CustomEvent("llmStream", { detail: data });
        window.dispatchEvent(event);
      } else {
        const event = new CustomEvent("llmStream", { detail: { done: true } });
        window.dispatchEvent(event);
        return data;
      }
    }
  }
}
