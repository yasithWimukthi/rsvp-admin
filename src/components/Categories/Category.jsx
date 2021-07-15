import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../../firebase/firebase.config";
import firebase from "firebase/app";
import CategoryTable from "./CategoryTable/CategoryTable";
import { CategoryAPI } from "../../api/category/";
import {
  useGetCategories,
  refetchCategories,
} from "../../queries/useGetCategories";
import CategoryAddDrawer from "../../components/Categories/CategoryAddDrawer/CategoryAddDrawer";
import "./Category.css";

import {
  Container,
  Card,
  LinearProgress,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import AddIcon from "@material-ui/icons/Add";

const Category = () => {
  const { register, handleSubmit } = useForm();
  const [imageFile, setImageFile] = useState();
  const { data: categoryData = [], status } = useGetCategories();
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const modalClose = () => {
    toggleDrawer(false);
  };

  const noData = status === "success" && categoryData?.length === 0;
  const hasData = status === "success" && categoryData?.length !== 0;

  const chooseImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
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
            CategoryAPI.addCategory(categoryData);
          })
          .catch((e) => {
            return e;
          });
      }
    );
  };

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2>Add Categories</h2>

        <div className="container p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Category Name"
                ref={register}
              />
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="imgUrl"
                name="imgUrl"
                onChange={chooseImage}
              />
              <label className="custom-file-label" htmlFor="imgUrl">
                Choose an Image for Category
              </label>
            </div>
            <div className="pt-4">
              <button type="submit" className="btn btn-success">
                <span className="fa fa-plus"></span> Add Category
              </button>
            </div>
          </form>
        </div>
        <div className="container-fluid">
          <Grid container spacing={2} className={"mb-3 mt-3"}>
            <Grid item xs={1} />
            <Grid item xs={9}>
              <SearchIcon className="search-icon" />{" "}
              <TableSearchInput onUpdate={setSearchText} />
            </Grid>
            <Grid item xs={2}>
              <button
                className="btn btn-primary"
                onClick={() => toggleDrawer(true)}
              >
                <AddIcon /> New Product
              </button>
            </Grid>
          </Grid>

          {status === "loading" && <LinearProgress />}

          <Container className="top-container">
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  {status === "error" && (
                    <Alert severity="error">Error loading Category Data</Alert>
                  )}
                  {noData && (
                    <Alert severity="info">You have no saved Categories.</Alert>
                  )}
                  {hasData && (
                    <CategoryTable
                      categories={categoryData}
                      searchVal={searchText}
                    />
                  )}
                </div>
              </Toolbar>
            </Card>
          </Container>
        </div>
      </div>
      {isDrawerOpen && (
        <CategoryAddDrawer
          closeModal={modalClose}
          refetchData={async () => {
            await refetchCategories();
          }}
        />
      )}
    </div>
  );
};

export default Category;
