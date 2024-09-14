"use client"

import { signIn } from "next-auth/react"
import GoogleIcon from "@mui/icons-material/Google"

const GoogleButton = () => {
  return (
    <button
      className="flex justify-center items-center w-full bg-theme-dark text-theme-white py-2 rounded-md hover:bg-opacity-90"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in with Google
      <GoogleIcon
        className="inline-block ml-2"
        sx={{
          fontSize: "15px",
        }}
      />
    </button>
  )
}

export default GoogleButton
