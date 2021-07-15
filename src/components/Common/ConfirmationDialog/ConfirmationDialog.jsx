import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Alert } from "@material-ui/lab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmationDialog({ isOpen, onClose, onConfirm, info }) {
  return (
    <>
      <div>
        <Dialog
          open={isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Do you want delete {info} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Alert severity="warning">
                <b>{info}</b> will be permanently deleted!
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={onClose} className="btn btn-default">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn btn-danger">
              <DeleteForeverIcon />
              Delete
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ConfirmationDialog;
