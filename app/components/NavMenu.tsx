"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import WalletIcon from "@mui/icons-material/Wallet"
import Popover from "@mui/material/Popover"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"

//-------------------------------------------------------------------------
const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const { data: session } = useSession()
  return (
    <nav className="flex justify-between items-center top-0 left-0 w-full bg-gradient-to-tr from-slate-900 to-slate-700 text-white p-4 z-10">
      <button
        className="group flex items-center space-x-3 cursor-pointer select-none"
        onClick={() => (window.location.href = "/")}
      >
        <div className="transform transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
          <WalletIcon />
        </div>
        <span>FreeWallet</span>
      </button>

      <div className="flex flex-1 justify-end items-center space-x-3">
        <span className="text-sm">{session?.user?.email}</span>
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
            className="rounded-full"
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
            fontSize: "14px",
          }}
        >
          Sign Out
        </MenuItem>
      </Popover>
      {/* </div> */}
    </nav>
  )
}

export default NavMenu
