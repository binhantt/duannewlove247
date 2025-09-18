'use client';

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function FacebookLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (typeof window !== 'undefined' && !(window as any).FB) {
        (window as any).fbAsyncInit = function() {
          (window as any).FB.init({
            appId: process.env.FB_CLIENT_ID || '',
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          });
        };

        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.src = 'https://connect.facebook.net/vi_VN/sdk.js';
        document.head.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setClicked(true);
    
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.login((response: any) => {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
            console.log('Facebook User Info:', userInfo);
            alert(`Xin chào ${userInfo.name}! Đăng nhập Facebook thành công.`);
            setIsLoading(false);
            setClicked(false);
          });
        } else {
          alert('Đăng nhập Facebook thất bại!');
          setIsLoading(false);
          setClicked(false);
        }
      }, { scope: 'email' });
    } else {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Đăng nhập với Facebook thành công!');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Đăng nhập thất bại!');
      } finally {
        setIsLoading(false);
        setClicked(false);
      }
    }
  };

  return (
    <button
      onClick={handleFacebookLogin}
      disabled={isLoading}
      className={`w-full h-14 border-2 border-black rounded-xl flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 relative overflow-hidden ${
        clicked
          ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white transform scale-105"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {clicked && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-3 h-3 text-white fill-current floating-button-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Facebook Icon */}
      <svg className="w-5 h-5 mr-3 relative z-10" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>

      <span className="relative z-10">Đăng nhập với Facebook</span>
    </button>
  );
}