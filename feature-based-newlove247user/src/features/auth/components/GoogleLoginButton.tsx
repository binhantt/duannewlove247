"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleButton() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return;

        // ✅ Decode token (FE biết user ngay)
        const user: any = jwtDecode(token);
        console.log("Google user:", user);

        // ✅ Gửi token về backend để verify + tạo JWT của bạn
        fetch("http://localhost:3000/api/users/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Backend login success:", data);
          });
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
