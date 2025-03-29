import Fetcher from "@/utils/Fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const fetcher = new Fetcher();

  console.log("chatting");

  const body = await request.json();

  if (typeof body.chat !== "string") throw "Invalid Body";
  if (typeof body.chatToken !== "string") throw "Invalid Body";

  const stream = await fetcher.chat({
    chat: body.chat,
    chatId: (await params).chatId,
    chatToken: body.chatToken,
  });

  return new NextResponse(stream);
}
