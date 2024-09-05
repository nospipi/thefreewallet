"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Popover from "@mui/material/Popover"
import { IconButton } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MenuItem from "@mui/material/MenuItem"
import DeleteBtn from "./DeleteBtn"

//-----------------------------------------------------------------------------

const MenuButton = () => {
  const router = useRouter()
  const { wallet_id } = useParams()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ;<Link href={`/wallet/${wallet?._id}/add_transaction`}>
  //   <IconButton
  //     aria-label="add"
  //     color="success"
  //     sx={{
  //       position: "absolute",
  //       bottom: 5,
  //       right: 5,
  //       zIndex: 1,
  //       border: "2px solid #BEBEBE",
  //     }}
  //   >
  //     <AddIcon />
  //   </IconButton>
  // </Link>

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label="add"
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 1,
          backgroundColor: "#30343f",
          "&:hover": {
            backgroundColor: "#404550",
          },
          "& .MuiTouchRipple-root .MuiTouchRipple-ripple": {
            color: "white",
          },
        }}
      >
        <MoreVertIcon
          sx={{
            color: "white",
            zIndex: 9999,
          }}
        />
      </IconButton>
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
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/wallet/${wallet_id}/add_transaction`)
          }}
          sx={{
            fontSize: "14px",
          }}
        >
          Add New Transaction
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/wallet/${wallet_id}/edit`)
          }}
          sx={{
            fontSize: "14px",
          }}
        >
          Edit Wallet
        </MenuItem>

        <DeleteBtn>
          <MenuItem
            sx={{
              color: "indianred",
              fontSize: "14px",
            }}
          >
            Delete Wallet
          </MenuItem>
        </DeleteBtn>
      </Popover>
    </>
  )
}

export default MenuButton
