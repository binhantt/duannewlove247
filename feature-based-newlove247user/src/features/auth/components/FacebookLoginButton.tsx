"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

export default function FacebookLoginButton() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    setClicked(true);
    window.location.href = " http://localhost:3000/api/users/auth/facebook/callback";
    
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`w-full h-10 border-2 border-black rounded-sm flex items-center justify-center font-medium transition-all duration-100 disabled:opacity-50 relative overflow-hidden ${
        clicked
          ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white transform scale-105"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {/* Hiệu ứng trái tim bay khi click */}
      {clicked && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-3 h-3 text-white fill-current animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Logo Facebook */}
      <svg
        className="w-5 h-5 mr-3 relative z-10"
        viewBox="0 0 24 24"
        fill="#1877F2"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>

      <span className="relative z-10">
        {loading ? "Đang chuyển hướng..." : "Đăng nhập với Facebook"}
      </span>
    </button>
  );
}
