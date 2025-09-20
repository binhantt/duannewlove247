import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={ async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return;

        const user: any = jwtDecode(token);
<<<<<<< HEAD
        console.log("👉 user:", user);
        const response = await fetch( `${process.env.NEXT_PUBLIC_google}`, {
=======
        console.log("Google user:", user);

        fetch("http://localhost:3000/api/users/auth/google", {
>>>>>>> 0995047c67afe8e9bddcb3fda0b108b9abcf0ca7
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
