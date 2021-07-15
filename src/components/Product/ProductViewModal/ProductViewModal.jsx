import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Table, TableBody, TableRow, TableCell, Chip } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductViewModal({ isOpen, onClose, product }) {
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
          {product?.name} Overview
        </DialogTitle>

        <DialogContent>
          <Table aria-label={"simple table"}>
            <TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell height={"2rem"}>{product?.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Tags</TableCell>
                  <TableCell>{product?.tags}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Featured Status</TableCell>
                  <TableCell>
                    {product?.isFeatured ? (
                      <Chip size={"small"} color={"primary"} label={"Yes"} />
                    ) : (
                      <Chip size={"small"} color={"secondary"} label={"No"} />
                    )}
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

export default ProductViewModal;
