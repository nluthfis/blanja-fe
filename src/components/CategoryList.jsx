import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import "../style/components/CategoryListItem.scss";

function CategoryList() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.75,
    },
  };

  return (
    <div className="CategoryList">
      <div className="row mb-3">
        <h2 className="fw-bold lh-1">Category</h2>
        <p className="text-muted lh-1">What are you currently looking for</p>
      </div>
      <div className="row">
        <div className="container">
          <Carousel
            responsive={responsive}
            infinite={true}
            itemClass="style-item"
          >
            <div className="item" style={{ backgroundColor: "#CC0B04" }}>
              <Link to={"/category/t-shirt"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/tshirt.png')",
                  }}
                >
                  <h2 className="title-item text-white">T-Shirt</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#1C3391" }}>
              <Link to={"/category/shorts"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/shorts.png')",
                  }}
                >
                  <h2 className="title-item text-white">Shorts</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#F67B02" }}>
              <Link to={"/category/jacket"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/jacket.png')",
                  }}
                >
                  <h2 className="title-item text-white">Jacket</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#E31F51" }}>
              <Link to={"/category/pants"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/pants.png')",
                  }}
                >
                  <h2 className="title-item text-white">Pants</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#5650D8" }}>
              <Link
                to={"/category/high-heels"}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/high-heels.png')",
                  }}
                >
                  <h2 className="title-item text-white">High Heels</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#B5D850" }}>
              <Link
                to={"/category/wristwatch"}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/watch.png')",
                  }}
                >
                  <h2 className="title-item text-white">Wristwatch</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#50C8D8" }}>
              <Link to={"/category/handbag"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/handbag.png')",
                  }}
                >
                  <h2 className="title-item text-white">Handbag</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#AC50D8" }}>
              <Link
                to={"/category/backpack"}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/backpack.png')",
                  }}
                >
                  <h2 className="title-item text-white">Backpack</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#D85089" }}>
              <Link to={"/category/socks"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/socks.png')",
                  }}
                >
                  <h2 className="title-item text-white">Socks</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#5086D8" }}>
              <Link to={"/category/glasses"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/glasses.png')",
                  }}
                >
                  <h2 className="title-item text-white">Glasses</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#53D850" }}>
              <Link to={"/category/cap"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/cap.png')",
                  }}
                >
                  <h2 className="title-item text-white">Cap</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#D8BA50" }}>
              <Link to={"/category/tie"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/tie.png')",
                  }}
                >
                  <h2 className="title-item text-white">Tie</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#D85091" }}>
              <Link to={"/category/dress"} style={{ textDecoration: "none" }}>
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/dress.png')",
                  }}
                >
                  <h2 className="title-item text-white">Dress</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#50D8AF" }}>
              <Link
                to={"/category/format-suit"}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/formal-suit.png')",
                  }}
                >
                  <h2 className="title-item text-white">Formal Suit</h2>
                </div>
              </Link>
            </div>

            <div className="item" style={{ backgroundColor: "#D85050" }}>
              <Link
                to={"/category/accessories"}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="img-item"
                  style={{
                    backgroundImage: "url('./assets/img/accessories.png')",
                  }}
                >
                  <h2 className="title-item text-white">Accessories</h2>
                </div>
              </Link>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
