import React from "react";
import { Snackbar } from "@mui/material";
import { useReplyContext } from "../context/reply_context";

export default function ReplyPopup() {
  const { reply, setReply } = useReplyContext();

  const handleClose = () => {
    if (reply) {
      setReply(false);
    }
  };

  return (
    <Snackbar
      open={!!reply}
      autoHideDuration={3000}
      onClose={handleClose}
      message={reply}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
}
