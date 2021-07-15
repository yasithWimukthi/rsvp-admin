import React from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useMutation } from "react-query";
import { deleteCategory } from "../../../api/category/category.request";
import { useToast } from "../../../hooks/useToast";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmationDialog from "../../Common/ConfirmationDialog/ConfirmationDialog";
import CategoryViewModal from "../CategoryViewModal/CategoryViewModal";

function ProductTableAction({ category }) {
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

  const [remove, { status: removeStatus }] = useMutation(deleteCategory, {
    onError() {
      displayToast(`Product ${category?.name} remove failed`, "default");
    },
    onSuccess() {
      displayToast(
        `Product ${category?.name} successfully removed.`,
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
          await remove(category?.id);
        }}
        info={category?.name}
      />

      <CategoryViewModal
        isOpen={openView}
        onClose={handleViewClose}
        category={category}
      />
    </>
  );
}

export default ProductTableAction;
