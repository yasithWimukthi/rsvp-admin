import React, { useState } from "react";
import DispatchedOrderTable from "./DispatchedOrderTable/DispatchedOrderTable";
import { useGetDispatchedOrders } from "../../../queries/useGetOrders";
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

const DispatchedOrders = () => {
  const { data: dispatchedOrderData = [], status } = useGetDispatchedOrders();
  const [searchText, setSearchText] = useState("");
  const noData = status === "success" && dispatchedOrderData?.length === 0;
  const hasData = status === "success" && dispatchedOrderData?.length !== 0;
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2>Orders</h2>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" href="/orders">
              New
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/dispatchedOrders">
              Dispatched
            </a>
          </li>
        </ul>
        <div className="container-fluid p-5">
          <h3>Dispatched Orders</h3>
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
                      <Alert severity="info">
                        You have no Dispatched Orders.
                      </Alert>
                    )}
                    {hasData && (
                      <DispatchedOrderTable
                        dispatchedOrders={dispatchedOrderData}
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
    </div>
  );
};

export default DispatchedOrders;
