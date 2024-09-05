import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"

//--------------------------------------------------------------

const Account = async () => {
  const session = await auth()
  const email = session?.user?.email as string
  const name = session?.user?.name as string
  const image = session?.user?.image as string

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5 bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        <Image
          src={image}
          width="100"
          height="100"
          alt={`${name}'s profile picture`}
          className="rounded-full"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-500 mt-2">{email}</p>
        </div>
        {/* Home Button */}
        <Link
          href="/"
          className="mt-4 bg-theme-dark hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Home
        </Link>
      </div>
      <p className="text-xs text-gray-500 w-full text-center absolute bottom-0 mb-4">
        © 2024 Vaggelis Magonezos, all rights reserved
      </p>
    </div>
  )
}

export default Account
