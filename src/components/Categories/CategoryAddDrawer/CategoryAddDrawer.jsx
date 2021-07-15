import React, { useState } from "react";
import { CategoryAPI } from "../../../api/category/";
import FormDrawer from "../../Common/FormDrawer/FormDrawer";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { storage } from "../../../firebase/firebase.config";
import firebase from "firebase/app";

function CategoryAddDrawer({ closeModal, refetchData }) {
  const { handleSubmit, register } = useForm();
  const [imageFile, setImageFile] = useState();

  const onSubmit = (data) => {
    const uploadTask = storage
      .ref("categories/" + imageFile.name)
      .put(imageFile);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        return snapshot;
      },
      (error) => {
        throw error;
      },
      () => {
        storage
          .ref("categories")
          .child(imageFile.name)
          .getDownloadURL()
          .then((url) => {
            const categoryData = {
              name: data.name,
              imgUrl: url,
            };
            CategoryAPI.addCategory(categoryData).then((res) => {
              if (res) {
                closeModal();
                refetchData();
              }
            });
          })
          .catch((e) => {
            return e;
          });
      }
    );
  };

  const chooseImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <FormDrawer title={"Add new Category"} width={350}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div className="form-group">
                <TextField
                  label={"Category Name"}
                  variant={"outlined"}
                  size={"small"}
                  fullWidth
                  name={"name"}
                  id={"name"}
                  inputRef={register}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="form-group">
                <input
                  type="file"
                  id="imgUrl"
                  name="imgUrl"
                  onChange={chooseImage}
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

export default CategoryAddDrawer;
