import React from "react";
import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";
import CardOrder from "./myOrder/cardOrder";
import NavbarOrder from "./myOrder/navbarOrder";
import "../style/pages/MyOrder.scss";
function AllItems() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="my-order">
        <div className="page-content ">
          <div className="container-fluid">
            <h4>My order</h4>

            <NavbarOrder />
            <CardOrder />
          </div>
        </div>
      </main>
    </>
  );
}

export default AllItems;
