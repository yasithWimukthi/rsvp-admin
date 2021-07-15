import React, { useEffect, useState } from "react";
import { OrderAPI } from "../../api/order";
import "./Order.css";
import StatusConfirmationDialog from "../Common/StatusConfirmationDialog/StatusConfirmationDialog";
import { changeStatus } from "../../api/order/order.request";
import { useMutation } from "react-query";

const OrderDetails = (props) => {
  const orderId = props.match.params.id;
  const [orderData, setOrderData] = useState();
  const [items, setItems] = useState();
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);
  const [status, setStatus] = useState();

  const handleChangeDialogClose = () => {
    setDeleteDialog(false);
  };

  const handleChangeDialogOpen = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    /* eslint-disable no-console */
    OrderAPI.getOrderById(orderId).then((res) => {
      setOrderData(res);
      OrderAPI.getItemListById(orderId).then((res) => {
        setItems(res);
      });
    });
  }, [orderId]);

  const handlePeriodChange = (selectedStatus) => {
    console.log(selectedStatus);
    setStatus(selectedStatus);
    if (
      selectedStatus !== "default" &&
      selectedStatus !== orderData.orderStatus
    ) {
      handleChangeDialogOpen();
    }
  };

  const [update] = useMutation(changeStatus, {
    onError() {},
    onSuccess() {
      OrderAPI.getOrderById(orderId).then((res) => {
        setOrderData(res);
        handleChangeDialogClose();
      });
    },
  });

  return (
    <div className="content-wrapper">
      <div className="container-fluid p-3">
        <h3>{orderData?.orderId}</h3>
        <div className="row">
          <div className="col-lg-7  p-0">
            <div className="order-details-box">
              <div className="order-details-bar">Order Details</div>
              <table class="table text-center">
                <tbody>
                  <tr>
                    <td>Customer Name</td>
                    <td>{orderData?.customerName}</td>
                  </tr>
                  <tr>
                    <td>Order Status</td>
                    <td>{orderData?.orderStatus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="order-details-box">
              <div className="order-details-bar">Payment Information</div>
              <div className="text-center p-3">
                <h1>{orderData?.totalPrice} $</h1>
                {orderData?.paymentMethod === "stripe" ? (
                  <i class="fa fa-cc-stripe fa-3x"></i>
                ) : (
                  <i class="fa fa-cc-paypal fa-3x"></i>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-7  p-0">
            <div className="order-details-box">
              <div className="order-details-bar">Status</div>
              <div className="container text-center">
                <h1 className="p-3">{orderData?.orderStatus}</h1>
                <table className="table text-center">
                  <tbody>
                    <tr>
                      <td className="align-middle">Change Status</td>
                      <td className="align-middle">
                        <form>
                          {" "}
                          <select
                            className="custom-select"
                            name="orderstatus"
                            id="orderstatus"
                            onChange={(val) =>
                              handlePeriodChange(val.target.value)
                            }
                          >
                            <option value="default" selected>
                              Select status
                            </option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="New">New</option>
                          </select>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="order-details-box">
              <div className="order-details-bar">Items Bought</div>
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Qty.</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.itemName}</td>
                        <td>{item?.itemQuantity}</td>
                        <td>{item?.itemPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <StatusConfirmationDialog
        isOpen={openDeleteDialog}
        onClose={handleChangeDialogClose}
        onConfirm={async () => {
          let newData = {
            orderId: orderData.orderId,
            orderStatus: status,
          };
          await update(newData);
        }}
        info={status}
      />
    </div>
  );
};
export default OrderDetails;
