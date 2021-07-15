import React, { useState } from "react";
import {
  refetchPromoCodes,
  useGetPromoCodes,
} from "../queries/useGetPromoCode";
import {
  Card,
  Container,
  Grid,
  LinearProgress,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../components/Common/TableViewComponents/TableSearchInput";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";
import PromoCodeTable from "../components/PromoCode/PromoCodeTable/PromoCodeTable";
import PromoCodeAddDrawer from "../components/PromoCode/PromoCodeAddDrawer/PromoCodeAddDrawer";

function PromoCodePage() {
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const modalClose = () => {
    toggleDrawer(false);
  };

  const { data = [], status } = useGetPromoCodes();

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  return (
    <>
      <div className="content-wrapper">
        <div className="container-fluid">
          <h4>Manage Promo Codes</h4>

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
                <AddIcon /> New Promo Code
              </button>
            </Grid>
          </Grid>

          {status === "loading" && <LinearProgress />}

          <Container className="top-container">
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  {status === "error" && (
                    <Alert severity="error">
                      Error loading Promo Codes Data
                    </Alert>
                  )}
                  {noData && (
                    <Alert severity="info">You have no saved Promo coe.</Alert>
                  )}
                  {hasData && (
                    <PromoCodeTable promoCodes={data} searchVal={searchText} />
                  )}
                </div>
              </Toolbar>
            </Card>
          </Container>
        </div>
      </div>

      {isDrawerOpen && (
        <PromoCodeAddDrawer
          closeModal={modalClose}
          refetchData={async () => {
            await refetchPromoCodes();
          }}
        />
      )}
    </>
  );
}

export default PromoCodePage;
