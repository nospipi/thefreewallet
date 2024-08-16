"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
//import { useGetWhoAmI } from "@/react-query-hooks";

//-------------------------------------------------------------------------
const NavMenu = () => {
  const { data: session } = useSession()
  // const { data: whoAmI, isFetching, isRefetching } = useGetWhoAmI();
  // console.log("whoAmI", whoAmI);
  if (session) {
    return (
      <div className="flex justify-between items-center sticky top-0 bg-theme-darkBrown text-theme-offWhite p-4">
        {/* <Link href="/protected">Protected Page</Link>
        <br /> */}

        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/create_wallet">Create wallet</Link>

        <Image
          src={session.user?.image as string}
          width="30"
          height="30"
          alt=""
        />
        {/* {(isFetching || isRefetching) && "Loading..."} */}
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <Link href="/protected">Protected Page</Link>
      <br />
      {/* {(isFetching || isRefetching) && "Loading..."} */}
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default NavMenu
