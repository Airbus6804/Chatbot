import Fetcher from "@/utils/Fetcher";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
    const fetcher = new Fetcher();

    const body = await request.json();

    if (typeof body.chat !== "string") throw "Invalid Body";
    if (typeof body.chatToken !== "string") throw "Invalid Body";

    const { chatId } = await params;

    const stream = await fetcher.chat({
        chat: body.chat,
        chatId,
        chatToken: body.chatToken,
    });

    revalidatePath(`/chat/${chatId}`, "layout");

    return new NextResponse(stream);
}
