'use client';

import { signIn, signOut } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ isSignedIn }: { isSignedIn: boolean }) {
  const handleClick = async () => {
    if (isSignedIn) {
      await signOut({ callbackUrl: "/" });
    } else {
      await signIn("google", { callbackUrl: "/" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
    >
      <FaGoogle />
      {isSignedIn ? "Sign out" : "Sign in with Google"}
    </button>
  );
}
