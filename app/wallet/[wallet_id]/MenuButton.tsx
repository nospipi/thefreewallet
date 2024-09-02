"use client";

import React, { useState, useActionState } from "react";
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { deleteWallet, IActionState } from "@/server_actions";
import { useParams } from "next/navigation";

//-----------------------------------------------------------------------------

const MenuButton = () => {
  const params = useParams();
  const wallet_id = params.wallet_id as string;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, action, isPending] = useActionState(deleteWallet, {
    success: null,
    error: null,
  } as IActionState);

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
          border: "2px solid #e0e0e0",
        }}
      >
        <MoreVertIcon
          sx={{
            color: "#1e2749",
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
        <MenuItem>Edit Wallet</MenuItem>
        <form action={action}>
          <input type="hidden" name="wallet_id" value={wallet_id} />
          <MenuItem
            sx={{
              color: "indianred",
            }}
          >
            Delete Wallet
          </MenuItem>
        </form>
      </Popover>
    </>
  );
};

export default MenuButton;
