"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
//import { useGetWhoAmI } from "@/react-query-hooks";

//-------------------------------------------------------------------------
const NavMenu = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center sticky top-0 bg-theme-darkBrown text-theme-offWhite p-4 z-10">
      <button onClick={() => signOut()}>Sign out</button>
      <Link href="/create_wallet">Create wallet</Link>
      <Image
        src={session?.user?.image as string}
        width="30"
        height="30"
        alt=""
      />
    </div>
  );
};

export default NavMenu
