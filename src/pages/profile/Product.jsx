import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

function Product() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event, index) => {
    const newImages = [...productImages];
    newImages[index] = event.target.files[0];
    setProductImages(newImages);
  };
  const handleConditionChange = (event) => {
    setProductCondition(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const validations = [
      {
        field: productName,
        label: "productName",
        minLength: 3,
        maxLength: 50,
        pattern: /^[A-Za-z ]+$/,
        errorMsg:
          "Please enter a valid Product Name (3 to 50 characters, letters and spaces only)",
      },
      {
        field: productCategory,
        label: "Product Category",
        minLength: 3,
        maxLength: 50,
        required: true,
        errorMsg: "Please enter a valid Product Category address ",
      },
      {
        field: productPrice,
        label: "Product Price",
        minLength: 5,
        maxLength: 18,
        pattern: /^\d+$/,
        errorMsg: "Please enter a valid Product Price (5 to 18 digits)",
      },
      {
        field: productColor,
        label: "Product Color",
        minLength: 3,
        maxLength: 50,
        required: true,
        errorMsg:
          "Please enter a valid Product Color (3 to 50 characters, letters and spaces only)",
      },
      {
        field: productSize,
        label: "Product Size",
        minLength: 1,
        maxLength: 50,
        required: true,
        errorMsg: "Please enter a Product Size",
      },
      {
        field: productCondition,
        label: "Product Condition",
        required: true,
        errorMsg: "Please enter Product Condition",
      },
      {
        field: productDescription,
        label: "Product Description",
        minLength: 3,
        maxLength: 500,
        required: true,
        errorMsg:
          "Please enter a valid Product Description  (3 to 50 characters, letters and spaces only)",
      },
      {
        field: productImages,
        label: "Product Images",
        required: true,
        errorMsg: "Please Input Product Image",
      },
    ];

    let isValid = true;
    const errorMessages = [];

    for (const validation of validations) {
      const {
        field,
        label,
        minLength,
        maxLength,
        pattern,
        required,
        errorMsg,
      } = validation;

      if (required && !field) {
        isValid = false;
        errorMessages.push(`Please enter ${label}`);
      }

      if (field && (field.length < minLength || field.length > maxLength)) {
        isValid = false;
        errorMessages.push(
          `${label} must be between ${minLength} and ${maxLength} characters`
        );
      }

      if (pattern && field && !pattern.test(field)) {
        isValid = false;
        errorMessages.push(errorMsg);
      }
    }

    if (productImages.length < 2) {
      isValid = false;
      errorMessages.push("Please upload at least 2 product images");
    }

    if (!isValid) {
      setLoading(false);
      Swal.fire({
        title: "Validation Error",
        text: errorMessages.join("\n"),
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_category", productCategory);
    formData.append("product_price", productPrice);
    formData.append("product_color", productColor);
    formData.append("product_size", productSize);
    formData.append("product_condition", productCondition);
    formData.append("product_description", productDescription);

    productImages.forEach((image) => {
      formData.append("photo", image);
    });

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setProductColor("");
      setProductSize("");
      setProductCondition("");
      setProductDescription("");
      setProductImages([]);
      Swal.fire({
        title: "Success",
        text: "Success Add New Product!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="my-order">
        <div className="page-content ">
          <div className="container-fluid">
            <h4>Add Product</h4>
            <div className="row mt-3 my-order-nav">
              <div className="col-12 text-link text-decoration-none">
                {/* <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? " text-decoration-none"
                      : isActive
                      ? "text-on text-decoration-none"
                      : "text-decoration-none"
                  }
                  to="/add-product"
                >
                  Add Product
                </NavLink> */}
              </div>
            </div>
            <hr />

            <div className="my-order">
              <div className="col-md-8 border-right mobile-position ">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 row ">
                    <label
                      htmlFor="product_name"
                      className="col-sm-3 col-form-label"
                    >
                      Product Name
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="product_name"
                        value={productName}
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row ">
                    <label
                      htmlFor="product_category"
                      className="col-sm-3 col-form-label"
                    >
                      Category
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="product_category"
                        value={productCategory}
                        onChange={(e) => {
                          setProductCategory(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2  row ">
                    <label
                      htmlFor="product_price"
                      className="col-sm-3 col-form-label"
                    >
                      Product Price
                    </label>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-2 row ">
                    <p className="text-muted">
                      Separate multiple colors with a comma (,) and a space ( )
                    </p>
                    <label
                      htmlFor="product_color"
                      className="col-sm-3 col-form-label"
                    >
                      Color list
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="product_color"
                        value={productColor}
                        onChange={(e) => {
                          setProductColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row ">
                    <p className="text-muted">
                      Separate multiple size with a comma (,) and a space ( )
                    </p>
                    <label
                      htmlFor="product_size"
                      className="col-sm-3 col-form-label"
                    >
                      Size list
                    </label>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="product_size"
                        value={productSize}
                        onChange={(e) => {
                          setProductSize(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label
                      htmlFor="product_description"
                      className="col-sm-3 col-form-label"
                    >
                      Description
                    </label>
                    <div className="col">
                      <textarea
                        className="form-control"
                        id="product_description"
                        value={productDescription}
                        onChange={(e) => {
                          setProductDescription(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-2 d-flex align-items-center">
                    <label htmlFor="radio" className="col-sm-3 col-form-label ">
                      Condition
                    </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="New"
                        checked={productCondition === "New"}
                        onChange={handleConditionChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        New
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="Second"
                        checked={productCondition === "Second"}
                        onChange={handleConditionChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Second
                      </label>
                    </div>
                  </div>
                  {[1, 2, 3, 4].map((index) => (
                    <div className="mb-3" key={index}>
                      <label
                        htmlFor={`upload-image-${index}`}
                        className="form-label"
                      >
                        Photo{index}
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id={`upload-image-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index - 1)}
                      />
                    </div>
                  ))}
                  <button className="btn btn-danger" type="submit">
                    Input Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Product;
