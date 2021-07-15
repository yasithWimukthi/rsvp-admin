import React from "react";
import {
  AppBar,
  Drawer,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";

const drawerStyles = { width: 600 };

function FormDrawer({ isLoading, title, width, onClose, children, maxWidth }) {
  const innerStyles = { maxWidth: maxWidth, width };

  return (
    <>
      <Drawer
        anchor="right"
        open={true}
        style={drawerStyles}
        className="right-drawer"
        onClose={onClose}
      >
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar>
            <Typography
              variant="h3"
              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
              className="mr-6 ml-6"
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress />}
        <div className="add-form-card container" style={innerStyles}>
          {children}
        </div>
      </Drawer>
    </>
  );
}

export default FormDrawer;
