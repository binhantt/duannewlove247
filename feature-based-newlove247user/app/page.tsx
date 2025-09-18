import GoogleLoginButton from "@/src/features/auth/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  return (
    <div>
    
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
    </div>
  );
}
