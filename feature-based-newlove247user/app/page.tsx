import GoogleLoginButton from "@/src/features/auth/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Hello, world!</h1>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
    </div>
  );
}
