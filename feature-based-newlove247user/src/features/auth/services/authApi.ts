"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export function useAuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      setToken(token);
      router.push("/dashboard");
    }
  }, [params, router, setToken]);
}
