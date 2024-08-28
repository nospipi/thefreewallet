"use client";

import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button
      className="fixed bottom-4 right-4 px-4 py-2 bg-theme-indianRed text-white rounded-full hover:bg-opacity-90"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
