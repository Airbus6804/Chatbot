"use client";

import server from "@/actions/server";
import AuthenticationForm, {
  AuthenticationFormData,
} from "@/components/authenticationForm";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TokenManager from "@/utils/TokenManager";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileForm() {
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const onSubmit = async (data: AuthenticationFormData) => {
    const response = await server("login", data);

    if (response.status == "error") {
      return setError(response.error);
    }

    const tokenManager = new TokenManager();
    await tokenManager.setAuthToken(response.token);
    router.push("/chat");
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
