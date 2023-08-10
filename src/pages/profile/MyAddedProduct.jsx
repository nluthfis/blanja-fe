import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MyAddedProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  //   console.log(product.data[0].product_name);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/seller/product`)
      .then((response) => {
        console.log(response);
        setProduct(response?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="my-order">
        <div className="page-content ">
          <div className="container-fluid">
            <h4>My Product</h4>
            <hr />
            <div className="my-order">
              <ul>
                {!loading ? (
                  product.data?.length > 0 ? (
                    product.data.map((productItem, index) => (
                      <li key={index}>
                        <>
                          {productItem.path
                            .slice(0, 1)
                            .map((photo, photoIndex) => (
                              <img
                                className="img-responsive object-fit-cover"
                                src={photo.photo_path}
                                alt="Product"
                              />
                            ))}
                          <div className="order-details">
                            <p>{productItem.product_name || <Skeleton />}</p>
                            <p>
                              {productItem.product_category || <Skeleton />}
                            </p>
                            <p>{productItem.product_color || <Skeleton />}</p>
                            <p>
                              {productItem.product_condition || <Skeleton />}
                            </p>
                            <p>
                              {productItem.product_description || <Skeleton />}
                            </p>
                            <p>{productItem.product_price || <Skeleton />}</p>
                            <p>{productItem.product_size || <Skeleton />}</p>
                          </div>
                        </>
                      </li>
                    ))
                  ) : (
                    <p>Product Not Found</p>
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
    </>
  );
}

export default MyAddedProduct;
