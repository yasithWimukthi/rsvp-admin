import React from "react";
import { useFilterRows } from "../../Common/TableViewComponents/useFilterData";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { TableFooterPagination } from "../../Common/TableViewComponents/TableFooterPagination";
import PromoCodeTableAction from "./PromoCodeTableAction";

function filterData(tableData, searchText = "") {
  if (searchText === "") return tableData;

  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

function PromoCodeTable({ promoCodes, searchVal = "" }) {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    promoCodes,
    filterData
  );
  return (
    <>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
          stickyHeader
          aria-label="sticky table"
          className="table-first-cell-padded"
        >
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData.map((p) => (
              <TableRow key={p?.id}>
                <TableCell>{p?.code}</TableCell>
                <TableCell>{p?.description}</TableCell>
                <TableCell>{p?.discountPercentage}</TableCell>
                <TableCell>{p?.isEnabled ? "Yes" : "NO"}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <PromoCodeTableAction promoCode={p} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && (
        <Alert severity="info">No matching Promo Codes</Alert>
      )}

      <TableFooterPagination {...tableFooterProps} />
    </>
  );
}

export default PromoCodeTable;
