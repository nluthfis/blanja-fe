import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../style/pages/MyOrder.scss";
import axios from "axios"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import CardOrder from "../../components/myOrder/cardOrder";
// import NavbarOrder from "../../components/myOrder/navbarOrder";


function MyOrder() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([])
  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!localStorage.getItem("auth")) {
      navigate("/login")
    }

    getOrders();
  }, [])

  const getOrders = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order`)
      .then((result) => {
        setLoading(false);
        setOrder(result?.data?.data);
        console.log(result?.data.data);
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
          const productData = result?.data?.data[0];
          console.log(productData);
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
    <>
      <Navbar />
      <Sidebar />
      <main id="my-order">
        <div className="page-content ">
          <div className="container-fluid">
            <h4>My order</h4>
            <div className="row mt-3 my-order-nav">
              <div className="col-12 text-link text-decoration-none">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                        ? "text-on text-decoration-none"
                        : "text-decoration-none"
                  }
                  to="#"
                >
                  {" "}
                  All items
                </NavLink>

                {/* <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/not-yet-paid"
                >
                  Not yet paid
                </NavLink>

                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/packed"
                >
                  Packed
                </NavLink>

                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/sent"
                >
                  Sent
                </NavLink>

                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/completed"
                >
                  Completed
                </NavLink>

                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/order-cancel"
                >
                  Order cancel
                </NavLink> */}
              </div>
            </div>
            <hr />
         {/* <NavbarOrder/>
       <CardOrder/> */}

          </div>
        </div>
      </main>
    </>
  );
}

export default MyOrder;
