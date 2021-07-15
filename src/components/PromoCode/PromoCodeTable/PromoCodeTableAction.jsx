import React from "react";
import { useToast } from "../../../hooks/useToast";
import { useMutation } from "react-query";
import { deletePromoCode } from "../../../api/promo-code/promo.code.request";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "../../Common/ConfirmationDialog/ConfirmationDialog";
import PromoCodeViewModal from "../PromoCodeViewModal/PromoCodeViewModal";

function PromoCodeTableAction({ promoCode }) {
  const displayToast = useToast();
  const [openView, setOpenView] = React.useState(false);
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleViewOpen = () => {
    setOpenView(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialog(true);
  };

  const [remove, { status: removeStatus }] = useMutation(deletePromoCode, {
    onError() {
      displayToast(`Promo Code ${promoCode?.code} remove failed`, "default");
    },
    onSuccess() {
      displayToast(
        `Promo Code ${promoCode?.code} successfully removed.`,
        "default"
      );
    },
  });

  const showMenuButton = removeStatus === "error" || removeStatus === "idle";

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            {removeStatus === "loading" && <CircularProgress size={25} />}
            {showMenuButton && (
              <IconButton {...bindTrigger(popupState)}>
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() => {
                  popupState.close();
                  handleViewOpen();
                }}
                style={{ color: "green" }}
              >
                <VisibilityIcon style={{ color: "green" }} /> View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  popupState.close();
                }}
                style={{ color: "orange" }}
              >
                <EditIcon style={{ color: "orange" }} />
                Edit
              </MenuItem>
              <MenuItem
                style={{ color: "red" }}
                onClick={() => {
                  popupState.close();
                  handleDeleteDialogOpen();
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>

      <ConfirmationDialog
        isOpen={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={async () => {
          await remove(promoCode?.id);
        }}
        info={promoCode?.code}
      />

      <PromoCodeViewModal
        isOpen={openView}
        onClose={handleViewClose}
        promoCode={promoCode}
      />
    </>
  );
}

export default PromoCodeTableAction;
