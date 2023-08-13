import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../style/pages/MyOrder.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MyOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }

    getOrders();
  }, []);

  const getOrders = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order`)
      .then((result) => {
        setLoading(false);
        setOrder(result?.data?.data);
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
            <hr />
            <div className="my-order">
              <ul>
                {!loading ? (
                  order?.length > 0 ? (
                    order.map((orderItem, index) => (
                      <li key={index}>
                        <>
                          {orderItem.path
                            .slice(0, 1)
                            .map((photo, photoIndex) => (
                              <img
                                className="img-responsive object-fit-cover"
                                src={photo.photo_path}
                                alt="Product"
                                key={photoIndex}
                              />
                            ))}
                          <div className="order-details">
                            <h2>
                              Order ID: {orderItem.order_id || <Skeleton />}
                            </h2>
                            <p>
                              Product:
                              {orderItem.product[0].product_name || (
                                <Skeleton />
                              )}
                            </p>
                            <p>
                              Quantity:
                              {orderItem.total_product || <Skeleton />}
                            </p>
                            <p>
                              Harga: {orderItem.total_price || <Skeleton />}
                            </p>
                            <p className="success-message">Success</p>
                          </div>
                        </>
                      </li>
                    ))
                  ) : (
                    <p>Order Not Found</p>
                  )
                ) : (
                  <li>
                    <>
                      <div className="order-details">
                        <h2>{<Skeleton width={500} />}</h2>
                        <p>{<Skeleton width={300} />}</p>
                        <p>{<Skeleton width={300} />}</p>
                        <p>{<Skeleton width={300} />}</p>
                        <p className="success-message">
                          {<Skeleton width={100} />}
                        </p>
                      </div>
                    </>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyOrder;
