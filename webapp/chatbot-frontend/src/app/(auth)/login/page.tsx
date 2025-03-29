"use client";

import server from "@/actions/server";
import AuthenticationForm, {
  AuthenticationFormData,
} from "@/components/authenticationForm";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function ProfileForm() {
  const [error, setError] = useState<null | string>(null);

  const onSubmit = async (data: AuthenticationFormData) => {
    const response = await server("login", data);

    if (response.status == "error") {
      return setError(response.error);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthenticationForm error={error} onSubmit={onSubmit} />
      </CardContent>
    </>
  );
}
