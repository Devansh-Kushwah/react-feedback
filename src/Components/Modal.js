import React from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Modal = ({
  title,
  openModal,
  setOpenModal,
  action,
  customClass,
  children,
  showCloseIcon = true,
}) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog  onClose={handleClose} open={openModal} className={customClass}>
      {title && (
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          fontWeight={400}
          style={{ textAlign: "center" }}
        >
          {title}
        </DialogTitle>
      )}
      {showCloseIcon && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseRounded />
        </IconButton>
      )}
      <DialogContent>{children}</DialogContent>
      {/* {!!action && <DialogActions>{action}</DialogActions>} */}
    </Dialog>
  );
};

export default Modal;
