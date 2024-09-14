"use client"
import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import WalletIcon from "@mui/icons-material/Wallet"
import LogoutIcon from "@mui/icons-material/Logout"
import Divider from "@mui/material/Divider"
import Menu from "@mui/material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"

//-------------------------------------------------------------------------
const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose: () => void = () => {
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
        <span>TheFreeWallet</span>
      </button>

      <IconButton
        onClick={handleClick}
        sx={{
          padding: "0",
          "& .MuiTouchRipple-root .MuiTouchRipple-ripple": {
            color: "black",
          },
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

      <Menu
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
        }}
      >
        <MenuItem
          className="flex flex-row gap-2"
          onClick={() => (window.location.href = "/account")}
        >
          <AccountCircleIcon />
          <span>{session?.user?.name}</span>
        </MenuItem>
        <Divider />
        <MenuItem
          className="flex flex-row gap-2"
          onClick={() => {
            if (window.confirm("Sign out ?")) {
              signOut()
            }
          }}
        >
          <LogoutIcon />
          <span>Sign Out</span>
        </MenuItem>
      </Menu>
      {/* </div> */}
    </nav>
  )
}

export default NavMenu
