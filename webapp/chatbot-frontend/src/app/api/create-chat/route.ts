import Fetcher from "@/utils/Fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const fetcher = new Fetcher();

    const body = await request.json();

    if (typeof body.chat !== "string") throw "Invalid Body";

    const stream = await fetcher.createChat({ chat: body.chat });

    return new NextResponse(stream);
}
