"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Popover from "@mui/material/Popover"
import AddIcon from "@mui/icons-material/Add"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"
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
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "rgb(5 61 5)",
          }}
        >
          <AddIcon
            sx={{
              fontSize: "small",
            }}
          />
          <span>Add New Transaction</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/wallet/${wallet_id}/edit`)
          }}
          sx={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "rgb(31 78 126)",
          }}
        >
          <ModeEditIcon
            sx={{
              fontSize: "small",
            }}
          />
          <span>Edit Wallet</span>
        </MenuItem>

        <DeleteBtn>
          <MenuItem
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              color: "rgb(112 44 44)",
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: "small",
              }}
            />
            <span>Delete Wallet</span>
          </MenuItem>
        </DeleteBtn>
      </Popover>
    </>
  )
}

export default MenuButton
