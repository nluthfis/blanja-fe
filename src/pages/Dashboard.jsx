import "../style/pages/Dashboard.scss";

import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import CarouselHome from "../components/CarouselHome";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboard() {
  const [loadingNew, setLoadingNew] = useState(false);
  const [newProductList, setNewProductList] = useState([]);
  const [currentPageNew, setCurrentPageNew] = useState(1);
  const [totalPageNew, setTotalPageNew] = useState(1);

  const [loadingPopular, setLoadingPopular] = useState(false);
  const [popularProductList, setPopularProductList] = useState([]);
  const [currentPagePopular, setCurrentPagePopular] = useState(1);
  const [totalPagePopular, setTotalPagePopular] = useState(1);

  useEffect(() => {
    setLoadingNew(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product?page=${currentPageNew}`)
      .then((response) => {
        console.log(response);
        setTotalPageNew(response?.data.pages.total);
        setNewProductList(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingNew(false);
      });
  }, [currentPageNew]);

  useEffect(() => {
    setLoadingPopular(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/product?page=${currentPagePopular}&by=review`
      )
      .then((response) => {
        setTotalPagePopular(response?.data?.pages?.total);
        setPopularProductList(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingPopular(false);
      });
  }, [currentPagePopular]);

  const handlePageChangeNew = (newPage) => {
    console.log(newPage);
    setCurrentPageNew(newPage);
  };

  const handlePageChangePopular = (newPage) => {
    console.log(newPage);
    setCurrentPagePopular(newPage);
  };

  return (
    <div className="Dashboard">
      <div className="row">
        <Navbar />
        <section id="carousel" className="container">
          <CarouselHome />
        </section>
        <section id="category-list" className="container">
          <div className="container mt-4">
            <CategoryList />
          </div>
        </section>
        <section id="new-product">
          <div className="container mt-4">
            <div className="row">
              <h2 className="fw-bold lh-1">New</h2>
              <p className="text-muted lh-1">You’ve never seen it before!</p>
            </div>
            <div className="row row-cols-md-5 rows-cols-xs-2">
              {!loadingNew ? (
                newProductList?.length > 0 ? (
                  newProductList.map((newProduct, index) => (
                    <div className="col" key={index}>
                      <ProductCard
                        productId={newProduct?.product_id}
                        image={newProduct?.path?.[0]?.photo_path}
                        title={newProduct?.product_name}
                        price={newProduct?.product_price}
                        storeName={newProduct?.product_category}
                        rating={newProduct.score}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12 mt-5">
                    <p className="text-center">No products found</p>
                  </div>
                )
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="col" key={index}>
                    <div className="ProductCard">
                      <Skeleton width={200} height={200} />
                      <div className="card-body">
                        {Array.from({ length: 2 }).map((_, index) => (
                          <h5 className="product-title card-title" key={index}>
                            <Skeleton width={200} />
                          </h5>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="pagination ">
            <div className="container text-center">
              {Array.from({ length: totalPageNew }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChangeNew(index + 1)}
                  type="button"
                  className={`btn ${
                    currentPageNew === index + 1 ? "btn-danger" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="popular-product">
          <div className="container mt-4">
            <div className="row">
              <h2 className="fw-bold lh-1">Popular</h2>
              <p className="text-muted lh-1">
                Find clothes that are trending recently
              </p>
            </div>
            <div className="row row-cols-md-5 rows-cols-xs-2">
              {!loadingPopular ? (
                popularProductList?.length > 0 ? (
                  popularProductList.slice(0, 10).map((newProduct) => (
                    <div className="col" key={newProduct?.product_id}>
                      <ProductCard
                        productId={newProduct?.product_id}
                        image={newProduct?.path?.[0]?.photo_path}
                        title={newProduct?.product_name}
                        price={newProduct?.product_price}
                        storeName={newProduct?.product_category}
                        rating={newProduct.score}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12 mt-5">
                    <p className="text-center">No products found</p>
                  </div>
                )
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="col" key={index}>
                    <div className="ProductCard">
                      {<Skeleton width={200} height={200} />}
                      <div className="card-body">
                        {Array.from({ length: 2 }).map((_, index) => (
                          <h5 className="product-title card-title" key={index}>
                            {<Skeleton width={200} />}
                          </h5>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="pagination2 ">
            <div className="container text-center">
              {Array.from({ length: totalPagePopular }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChangePopular(index + 1)}
                  type="button"
                  className={`btn ${
                    currentPagePopular === index + 1 ? "btn-danger" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
