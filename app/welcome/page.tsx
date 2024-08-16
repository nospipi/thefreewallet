"use client"
import { signIn } from "next-auth/react"

const Welcome = () => {
  return (
    <div className="min-h-screen bg-theme-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-theme-offWhite rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-theme-darkBrown">Welcome!</h1>
          <p className="text-theme-secondaryText">
            Please login or register to continue
          </p>
        </div>

        <div className="space-y-3">
          <button
            className="block w-full text-center bg-theme-darkBrown text-theme-offWhite py-2 rounded-md hover:bg-opacity-90"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign in
          </button>
          <button className="block w-full text-center bg-theme-lightPeach text-theme-darkBrown py-2 rounded-md hover:bg-opacity-90">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
