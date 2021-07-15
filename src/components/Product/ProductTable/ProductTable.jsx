import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@material-ui/core";
import ProductTableAction from "./ProductTableAction";
import { useFilterRows } from "../../Common/TableViewComponents/useFilterData";
import Alert from "@material-ui/lab/Alert";
import { TableFooterPagination } from "../../Common/TableViewComponents/TableFooterPagination";

function filterData(tableData, searchText = "") {
  if (searchText === "") return tableData;

  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

const ProductTable = ({ products, searchVal }) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    products,
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
              <TableCell>Name</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Featured Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData.map((p) => (
              <TableRow key={p?.id}>
                <TableCell>{p?.name}</TableCell>
                <TableCell>{p?.tags}</TableCell>
                <TableCell>
                  {p?.isFeatured ? (
                    <Chip size={"small"} color={"primary"} label={"Yes"} />
                  ) : (
                    <Chip size={"small"} color={"secondary"} label={"No"} />
                  )}
                </TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <ProductTableAction product={p} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && <Alert severity="info">No matching Products</Alert>}

      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default ProductTable;
