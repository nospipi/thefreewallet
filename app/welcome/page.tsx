"use client"
import { signIn } from "next-auth/react"
import GoogleIcon from "@mui/icons-material/Google"

const Welcome = () => {
  return (
    <div className="min-h-screen bg-theme-white flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md bg-theme-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-theme-dark">Welcome!</h1>
          {/* <p className="text-theme-blue">Please login to continue</p> */}
        </div>

        <div className="space-y-3">
          <button
            className="block w-full text-center bg-theme-dark text-theme-white py-2 rounded-md hover:bg-opacity-90"
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
        </div>
      </div>
    </div>
  )
}

export default Welcome
