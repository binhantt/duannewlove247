'use client';

import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md relative">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-xl relative border-2 border-black">
        {children}
      </div>
    </div>
  );
}
