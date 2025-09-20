"use client";

import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return;

        const user: any = jwtDecode(token);
        console.log("👉 user:", user);

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_google}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credentialResponse }),
          });

          const data = await response.json();
          console.log("Backend response:", data);

          // ✅ Hiển thị toast success
          toast.success("Đăng nhập thành công!");

          // ✅ Chuyển hướng sau 1s để toast kịp hiện
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        } catch (err) {
          console.error(err);
          toast.error("Đăng nhập thất bại, thử lại sau!");
        }
      }}
      onError={() => {
        console.log("Login Failed");
        toast.error("Login Failed");
      }}
    />
  );
}
