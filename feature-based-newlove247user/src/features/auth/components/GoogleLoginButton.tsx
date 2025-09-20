import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={ async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return;

        const user: any = jwtDecode(token);
        console.log("👉 user:", user);
        const response = await fetch( `${process.env.NEXT_PUBLIC_google}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credentialResponse }),
        })

        const data = await response.json();
        console.log("Backend response:", data);


      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
