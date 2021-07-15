import React, { useState } from "react";
import NewOrderTable from "./NewOrderTable/NewOrderTable";
import { useGetNewOrders } from "../../../queries/useGetOrders";
import {
  Container,
  Card,
  LinearProgress,
  Toolbar,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../../components/Common/TableViewComponents/TableSearchInput";

const NewOrders = () => {
  const { data: newOrderData = [], status } = useGetNewOrders();
  const [searchText, setSearchText] = useState("");
  const noData = status === "success" && newOrderData?.length === 0;
  const hasData = status === "success" && newOrderData?.length !== 0;
  return (
    <div>
      <div className="container-fluid p-5">
        <h3>New Orders</h3>
        <div className="container-fluid">
          <Grid container spacing={2} className={"mb-3 mt-3"}>
            <Grid item xs={1} />
            <Grid item xs={9}>
              <SearchIcon className="search-icon" />{" "}
              <TableSearchInput onUpdate={setSearchText} />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>

          {status === "loading" && <LinearProgress />}

          <Container className="top-container">
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  {status === "error" && (
                    <Alert severity="error">Error loading Order Data</Alert>
                  )}
                  {noData && (
                    <Alert severity="info">You have no new Orders.</Alert>
                  )}
                  {hasData && (
                    <NewOrderTable
                      newOrders={newOrderData}
                      searchVal={searchText}
                    />
                  )}
                </div>
              </Toolbar>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NewOrders;
