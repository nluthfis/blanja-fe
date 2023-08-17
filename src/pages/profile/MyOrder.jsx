import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../style/pages/MyOrder.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderItem from "../../components/myOrder/OrderItem";
import OrderItemSkeleton from "../../components/myOrder/OrderItemSkeleton";

function MyOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
    getCart();
    getOrders();
  }, []);

  const getCart = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order?statusOrder=order_created`)
      .then((result) => {
        setLoading(false);
        setCart(result?.data?.data);
        getProductsByIds(result?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getOrders = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order?statusOrder=pending`)
      .then((result) => {
        setLoading(false);
        setOrder(result?.data?.data);
        console.log(result?.data?.data);
        getProductsByIds(result?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getProductsByIds = (orders) => {
    const productIds = orders.map((item) => item.product_id);

    productIds.forEach((productId) => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/product/${productId}`)
        .then((result) => {
          setLoading(false);
          // console.log(result);
          const productData = result?.data?.data[0];
          // console.log(productData);
          if (productData) {
            setProducts((prevProducts) => [...prevProducts, productData]);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    });
  };

  return (
    <div className="profile" style={{ overflowX: "hidden" }}>
      <Navbar />
      <Sidebar />
      <main id="my-order">
        <div className="page-content ">
          <div className="container-fluid">
            <h4>My order</h4>
            <Tabs>
              <TabList className="d-flex ">
                <Tab className="d-flex w-50">On Process</Tab>
                <Tab className="d-flex w-50">Cart</Tab>
              </TabList>

              <TabPanel>
                <div className="my-order">
                  <ul>
                    {!loading ? (
                      order?.length > 0 ? (
                        order.map((orderItem, index) => (
                          <OrderItem key={index} orderItem={orderItem} />
                        ))
                      ) : (
                        <p>Order Not Found</p>
                      )
                    ) : (
                      <OrderItemSkeleton />
                    )}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="my-order">
                  <ul>
                    {!loading ? (
                      cart?.length > 0 ? (
                        cart.map((orderItem, index) => (
                          <OrderItem key={index} orderItem={orderItem} />
                        ))
                      ) : (
                        <p>Order Not Found</p>
                      )
                    ) : (
                      <OrderItemSkeleton />
                    )}
                  </ul>
                </div>
              </TabPanel>
            </Tabs>
            <hr />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyOrder;
