import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Link,
} from "@material-ui/core";
import CategoryTableAction from "./CategoryTableAction";
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

const CategoryTable = ({ categories, searchVal }) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    categories,
    filterData
  );
  // const classes = useStyles();

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
              <TableCell>Category Name</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData.map((p) => (
              <TableRow key={p?.id}>
                <TableCell>{p?.name}</TableCell>
                <TableCell>
                  <Link href={p?.imgUrl} target={"a"}>
                    <Avatar variant="square" src={p?.imgUrl} />
                  </Link>
                </TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <CategoryTableAction category={p} />
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

export default CategoryTable;
