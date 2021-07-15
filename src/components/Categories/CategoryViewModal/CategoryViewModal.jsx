import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CategoryViewModal({ isOpen, onClose, category }) {
  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {category?.name} Overview
        </DialogTitle>

        <DialogContent>
          <Table aria-label={"simple table"}>
            <TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{category?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    <img src={category?.imgUrl} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <button onClick={onClose} className="btn btn-default">
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryViewModal;
