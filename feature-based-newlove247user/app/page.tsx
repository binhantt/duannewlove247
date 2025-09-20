'use client';

import GoogleLoginButton from "@/src/features/auth/components/GoogleLoginButton";
import FacebookLoginButton from "@/src/features/auth/components/FacebookLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
<<<<<<< HEAD
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
=======
>>>>>>> 0995047c67afe8e9bddcb3fda0b108b9abcf0ca7

export default function Home() {
  const [hearts, setHearts] = useState<Array<{left: string, top: string, delay: string, size: string}>>([]);
  const [sparkles, setSparkles] = useState<Array<{left: string, top: string, delay: string}>>([]);

  useEffect(() => {
    const heartsData = Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.3}s`,
      size: `${Math.random() * 10 + 10}px`
    }));

    const sparklesData = Array.from({ length: 25 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 0.1}s`
    }));

    setHearts(heartsData);
    setSparkles(sparklesData);
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-white opacity-20 animate-pulse floating-heart"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              fontSize: heart.size
            }}
          >
            <Heart className={`fill-current ${i % 3 === 0 ? 'animate-bounce' : i % 3 === 1 ? 'animate-ping' : 'animate-pulse'}`} />
          </div>
        ))}
      </div>

      {/* Sparkling effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-xl relative border-2 border-black">
          
          {/* Logo with pulsing effect */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center pulsing-logo">
              <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 animated-gradient-text">
              Kết nối yêu thương thông minh
            </h1>
            <p className="text-gray-600 text-base">
              Đăng nhập nhanh bằng mạng xã hội
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            {/* Google Login Button */}
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
              <GoogleLoginButton />
            </GoogleOAuthProvider>

            {/* Facebook Login Button */}
            <FacebookLoginButton />
          </div>

          {/* Terms */}
          <div className="text-center">
            <p className="text-sm text-gray-500 leading-relaxed">
              Bằng việc đăng nhập, bạn đồng ý với{' '}
              <button className="text-blue-500 underline hover:text-blue-600">
                Chính sách
              </button>
              {' '}và{' '}
              <button className="text-blue-500 underline hover:text-blue-600">
                Bảo mật
              </button>
              {' '}của chúng tôi.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .floating-heart {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .pulsing-logo {
          animation: logoPulse 2s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(236, 72, 153, 0.6); }
        }

        .floating-button-heart {
          animation: buttonHeart 1s ease-out infinite;
        }

        @keyframes buttonHeart {
          0% { 
            transform: translateY(100%) scale(0); 
            opacity: 0; 
          }
          50% { 
            opacity: 1; 
            transform: translateY(-50%) scale(1); 
          }
          100% { 
            transform: translateY(-100%) scale(0); 
            opacity: 0; 
          }
        }

        .animated-gradient-text {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #9b59b6, #e91e63, #f06292);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
=======
    <div>
    
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
>>>>>>> 0995047c67afe8e9bddcb3fda0b108b9abcf0ca7
    </div>
  );
}