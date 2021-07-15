import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useFilterRows } from "../../../Common/TableViewComponents/useFilterData";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { TableFooterPagination } from "../../../Common/TableViewComponents/TableFooterPagination";
function filterData(tableData, searchText = "") {
  if (searchText === "") return tableData;

  return tableData.filter(
    (dataObj) =>
      dataObj.orderId && dataObj.orderId.toLowerCase().includes(searchText)
  );
}
const DispatchedOrderTable = ({ dispatchedOrders, searchVal }) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    dispatchedOrders,
    filterData
  );
  return (
    <div>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
          stickyHeader
          aria-label="sticky table"
          className="table-first-cell-padded"
        >
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData.map((p) => (
              <TableRow key={p?.id}>
                <TableCell>{p?.orderId}</TableCell>
                <TableCell>{p?.customerName}</TableCell>
                <TableCell>{p?.orderStatus}</TableCell>
                <TableCell>
                  {" "}
                  <Link to={`/order/${p?.orderId}`}>
                    {" "}
                    <VisibilityIcon style={{ color: "green" }} /> View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && <Alert severity="info">No matching Products</Alert>}

      <TableFooterPagination {...tableFooterProps} />
    </div>
  );
};

export default DispatchedOrderTable;
