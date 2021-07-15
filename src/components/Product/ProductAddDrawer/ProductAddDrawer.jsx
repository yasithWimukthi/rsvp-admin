import React from "react";
import { useMutation } from "react-query";
import { addProduct } from "../../../api/product/product.request";
import FormDrawer from "../../Common/FormDrawer/FormDrawer";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

function ProductAddDrawer({ closeModal, refetchData }) {
  const { handleSubmit, register } = useForm();
  const [onSubmit, { status }] = useMutation(addProduct, {
    onError() {},
    onSuccess() {
      closeModal();
      refetchData();
    },
  });

  return (
    <>
      <FormDrawer
        title={"Add new product"}
        isLoading={status === "loading"}
        width={350}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div className="form-group">
                <TextField
                  label={"Product Name"}
                  variant={"outlined"}
                  size={"small"}
                  fullWidth
                  name={"name"}
                  ref={register}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="form-group">
                <TextField
                  label={"Product Description"}
                  variant={"outlined"}
                  size={"small"}
                  fullWidth
                  name={"description"}
                  rows={3}
                  ref={register}
                />
              </div>
            </Grid>
          </Grid>

          <div>
            <button className="btn btn-primary" type={"submit"}>
              Save
            </button>{" "}
            <button onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </FormDrawer>
    </>
  );
}

export default ProductAddDrawer;
