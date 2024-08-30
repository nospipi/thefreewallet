"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
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
          marginTop: "5px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Button
          onClick={() => (window.location.href = "/api/auth/signout")}
          variant="text"
          sx={{
            fontSize: "11px",
          }}
        >
          Sign Out
        </Button>
      </Popover>
    </div>
  );
};

export default NavMenu
