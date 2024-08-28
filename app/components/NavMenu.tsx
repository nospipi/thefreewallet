"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";

//-------------------------------------------------------------------------
const NavMenu = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center sticky top-0 bg-theme-darkBrown text-theme-offWhite p-4 z-10">
      {/* HOME BUTTON */}

      {!isHome && (
        <HomeIcon
          className="cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
      )}

      <div className="flex flex-1 justify-end items-center space-x-4">
        <span>{session?.user?.email}</span>
        <Image
          src={session?.user?.image as string}
          width="30"
          height="30"
          alt=""
        />
      </div>
    </div>
  );
};

export default NavMenu
