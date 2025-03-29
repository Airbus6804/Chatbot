import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import z from "zod";

interface Props {
    handleSendInvite: (email: string) => void;
    disabled: boolean;
}

export default function ChatInviteModal({ handleSendInvite, disabled }: Props) {
    const [email, setEmail] = useState("");

    const schema = z.string().email("Email non valida");
    const [error, setError] = useState("");

    console.log(error);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={disabled ? "ghost" : "default"}>
                    Invita un amico alla chat
                </Button>
            </DialogTrigger>
            <DialogContent className="w-max flex flex-col gap-4">
                <DialogHeader>
                    <DialogTitle>Invita un amico</DialogTitle>
                    <DialogDescription>
                        Digita l'indirizzo email del tuo amico
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    try {
                                        const result = schema.parse(email);
                                        e.preventDefault();
                                        handleSendInvite(result);
                                        return setError("Email Inviata");
                                    } catch (err: any) {
                                        setError(
                                            JSON.parse(err.message)[0].message
                                        );
                                    }
                                }
                            }}
                        />
                    </DialogDescription>
                    <DialogFooter>{error}</DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
