import React from "react";
import NewOrders from "./NewOrders/NewOrders";

const Order = () => {
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2>Orders</h2>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="/orders">
              New
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/dispatchedOrders">
              Dispatched
            </a>
          </li>
        </ul>
        <NewOrders />
      </div>
    </div>
  );
};

export default Order;
