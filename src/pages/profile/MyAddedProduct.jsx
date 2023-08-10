import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

function MyAddedProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/seller/product`)
      .then((response) => {
        setProduct(response?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/product?product_id=${productId}`,
        {}
      )
      .then((result) => {
        setProduct((prevProduct) => {
          if (
            prevProduct &&
            prevProduct.data &&
            Array.isArray(prevProduct.data)
          ) {
            const updatedData = prevProduct.data.filter(
              (productItem) => productItem.product_id !== productId
            );
            return { ...prevProduct, data: updatedData };
          }
          return prevProduct;
        });
        Swal.fire({
          title: "Success",
          text: "Address Deleted!",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error?.response?.data?.message);
        Swal.fire({
          title: "Failed",
          text: "Failed Delete Address",
          icon: "error",
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
            <h4>My Product</h4>
            <hr />
            <div className="my-order">
              <ul>
                {!loading ? (
                  product.data?.length > 0 ? (
                    product.data.map((productItem, index) => (
                      <li key={productItem.product_id}>
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
                          <div>
                            <button
                              className="btn btn-danger btn-change-address"
                              onClick={() =>
                                handleDeleteProduct(productItem.product_id)
                              }
                            >
                              Delete
                            </button>
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
