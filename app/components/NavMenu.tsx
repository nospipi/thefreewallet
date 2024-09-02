"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image";
import WalletIcon from "@mui/icons-material/Wallet";
import { usePathname } from "next/navigation";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

//-------------------------------------------------------------------------
const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
      {!isHome && (
        <WalletIcon
          className="cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
      )}

      <div className="flex flex-1 justify-end items-center space-x-4">
        <span>{session?.user?.email}</span>
        <IconButton
          onClick={handleClick}
          sx={{
            padding: "0",
          }}
        >
          <Image
            src={session?.user?.image as string}
            width="30"
            height="30"
            alt=""
          />
        </IconButton>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        <MenuItem
          onClick={() => (window.location.href = "/api/auth/signout")}
          variant="text"
          sx={{
            color: "indianred",
          }}
        >
          Sign Out
        </MenuItem>
      </Popover>
      {/* </div> */}
    </nav>
  );
};

export default NavMenu
