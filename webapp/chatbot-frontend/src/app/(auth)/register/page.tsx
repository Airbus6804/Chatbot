"use client";

import server from "@/actions/server";
import AuthenticationForm, {
  AuthenticationFormData,
} from "@/components/authenticationForm";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function ProfileForm() {
  const [error, setError] = useState<null | string>(null);
  const [sent, setSent] = useState<boolean>(false);

  const onSubmit = async (data: AuthenticationFormData) => {
    const response = await server("register", data);

    if (response.status == "error") {
      setSent(false);
      return setError(response.error);
    }
    setError(null);
    setSent(true);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthenticationForm error={error} onSubmit={onSubmit} />
      </CardContent>
      <CardContent>
        {sent && (
          <CardDescription>
            Ti abbiamo inviato una mail all'indirizzo che ci hai fornito, Clicca
            il link e attiva il tuo account!
          </CardDescription>
        )}
      </CardContent>
    </>
  );
}
