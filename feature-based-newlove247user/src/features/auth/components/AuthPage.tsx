'use client';

import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthTitle from "../components/AuthTitle";
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";

export default function AuthPage() {
  const [hearts, setHearts] = useState<any[]>([]);
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.3}s`,
      size: `${Math.random() * 10 + 10}px`,
    })));

    setSparkles(Array.from({ length: 25 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.1}s`,
    })));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-6 relative overflow-hidden">
      <AuthBackground hearts={hearts} sparkles={sparkles} />
      <AuthCard>
        <AuthLogo />
        <AuthTitle />
        <div className="space-y-4 mb-8">
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
          <FacebookLoginButton />
        </div>
      </AuthCard>
    </div>
  );
}
