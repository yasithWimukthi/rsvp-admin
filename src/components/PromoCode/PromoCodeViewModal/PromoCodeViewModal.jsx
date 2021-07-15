import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PromoCodeViewModal({ isOpen, onClose, promoCode }) {
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
          {promoCode?.code} Overview
        </DialogTitle>

        <DialogContent>
          <Table aria-label={"simple table"}>
            <TableBody>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>{promoCode?.code}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{promoCode?.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Discount Percentage</TableCell>
                <TableCell>{promoCode?.discountPercentage}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{promoCode?.isEnabled ? "Yes" : "No"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PromoCodeViewModal;
