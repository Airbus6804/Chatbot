"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import IChatMessage from "@/types/ChatMessage";
import {
    ChatDoneResponse,
    ChatInProgressResponse,
} from "@/types/responses/chatResponses";
import { useEffect, useState } from "react";
import { decode } from "html-entities";

interface Props {
    data: IChatMessage;
}

export default function ChatMessage({ data }: Props) {
    const [currentMessage, setCurrentMessage] = useState(data.text);
    const [currentLoading, setCurrentLoading] = useState(data.loading);

    useEffect(() => {
        if (data.loading) {
            const callback = (data: any) => {
                if (!currentLoading) return;
                const detail = data.detail as
                    | ChatInProgressResponse
                    | ChatDoneResponse;
                if (!detail.done) {
                    setCurrentMessage((m) => `${m}${detail.content}`);
                } else {
                    setCurrentLoading(false);
                }
            };

            window.addEventListener("llmStream", callback);

            return () => window.removeEventListener("llmStream", callback);
        }
    }, [currentLoading]);

    return (
        <div
            style={{
                justifyContent:
                    data.email === "chatbot" ? "flex-start" : "flex-end",
            }}
            className="flex self-stretch">
            <Card className="flex-1 max-w-8/12">
                <CardHeader className="!normal-case">
                    <CardTitle className="!normal-case whitespace-pre-wrap">
                        {decode(currentMessage)}
                        {currentLoading && (
                            <div className="inline-block h-5 w-1 bg-white" />
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription
                        style={{
                            textAlign:
                                data.email === "chatbot" ? "right" : "left",
                        }}>
                        {data.email}
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}
