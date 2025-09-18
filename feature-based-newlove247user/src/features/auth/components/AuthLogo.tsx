'use client';

import { Heart } from "lucide-react";

export default function AuthLogo() {
  return (
    <div className="flex justify-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center pulsing-logo">
        <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
      </div>
    </div>
  );
}
