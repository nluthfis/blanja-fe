import "../style/pages/Checkout.scss";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Swal from "sweetalert2";

function Checkout() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const address_name = useRef();
  const recipient_name = useRef();
  const recipient_phone_number = useRef();
  const address_data = useRef();
  const postal_code = useRef();
  const city = useRef();
  const [order, setOrder] = useState([]);
  const [previousTransactionToken, setPreviousTransactionToken] =
    useState(null);
  let totalPrice = 0;
  let totalProduct = 0;
  let totalDelivery = 0;
  let totalOrder = 0;

  for (const orders of order) {
    totalPrice += parseFloat(orders.total_price);
    totalProduct += parseFloat(orders.total_product);
    totalDelivery += parseFloat(orders.shipping_price);
    totalOrder++;
  }

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("auth") === null) {
      window.location.href = "/login";
    }
    const getOrder = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/order?statusOrder=order_created`
        );
        setOrder(result.data.data);
        setPreviousTransactionToken(result?.data?.data[0].transaction_token);
        console.log(result?.data?.data[0].transaction_token);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/address`
        );
        setAddress(result?.data?.data);
        setSelectedAddress(result?.data?.data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getOrder();
    fetchData();
  }, []);
  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  const getAddress = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/address`)
      .then((result) => {
        setLoading(false);
        setAddress(result?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSubmitAddress = (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      const validateField = (fieldValue, minLength, maxLength, fieldName) => {
        if (
          fieldValue === "" ||
          fieldValue.length < minLength ||
          fieldValue.length > maxLength
        ) {
          setErrMsg(
            `${fieldName} can't be empty and must be between ${minLength} and ${maxLength} characters`
          );
          return false;
        }
        return true;
      };

      if (
        !validateField(address_name.current.value, 3, 50, "Address name") ||
        !validateField(recipient_name.current.value, 3, 50, "Recipient name") ||
        !validateField(address_data.current.value, 3, 50, "Address") ||
        !validateField(
          recipient_phone_number.current.value,
          8,
          18,
          "Recipient phone number"
        ) ||
        !validateField(postal_code.current.value, 5, 10, "Postal code") ||
        !validateField(city.current.value, 5, 20, "City")
      ) {
        setLoading(false);
        return;
      }
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/customer/address`, {
          address_name: address_name.current.value,
          recipient_name: recipient_name.current.value,
          recipient_phone_number: recipient_phone_number.current.value,
          address_data: address_data.current.value,
          postal_code: postal_code.current.value,
          city: city.current.value,
        })
        .then((result) => {
          setLoading(false);
          getAddress();
          setAddress([...address, result?.data?.data]);
          handleClose();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const requestData = {
    statusOrder: order[0]?.status,
    order_id_payment: order[0]?.order_id_payment,
  };

  const handleCheckOut = () => {
    try {
      setLoading(true);
      if (selectedAddress === null || selectedAddress === undefined) {
        Swal.fire({
          title: "Failed",
          text: "Select address first!",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      if (order[0]?.transaction_token !== null && previousTransactionToken) {
        window.snap.pay(order[0]?.transaction_token);
        setLoading(false);
        return;
      } else if (previousTransactionToken) {
        window.snap.pay(previousTransactionToken);
        setLoading(false);
        return;
      }
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/create-payment`, requestData)
        .then((result) => {
          setLoading(false);
          const transactionToken = result?.data?.data?.transactionToken;
          setPreviousTransactionToken(transactionToken);
          window.snap.pay(transactionToken);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleDeleteOrder = (orderId) => {
    try {
      const params = new URLSearchParams();
      params.append("order_id", orderId);

      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/order/delete-order`, {
          data: params,
        })
        .then((response) => {
          setOrder(order.filter((item) => item.order_id !== orderId));
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="Checkout">
      <Navbar />

      <section id="content-checkout" className="container">
        <div className="row mb-3">
          <h2 className="fw-bold lh-1 mt-5">Checkout</h2>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="row mb-4">
              <h6 className="fw-bold">Shipping Address</h6>
              <div id="card-shipping" className="card mt-1">
                <div className="card-body">
                  {address?.length > 0 ? (
                    <>
                      <h6 className="fw-bold">
                        {selectedAddress?.recipient_name} (
                        {selectedAddress?.address_name})
                      </h6>
                      <p className="text mb-0">
                        {selectedAddress?.recipient_phone_number}
                      </p>
                      <h6 className="card-title">
                        {selectedAddress?.address_data}
                      </h6>
                      <p className="card-text">
                        {selectedAddress?.city} {selectedAddress?.postal_code}
                      </p>
                      <button
                        id="btn-address"
                        type="button"
                        className="btn btn-light border-2 border rounded-pill"
                        onClick={handleShow}
                      >
                        Choose another address
                      </button>
                    </>
                  ) : (
                    <>
                      <p>There are no addresses.</p>
                      <button
                        id="btn-address"
                        type="button"
                        className="btn btn-light border-2 border rounded-pill"
                        onClick={handleShow}
                      >
                        Add address
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <h6 className="fw-bold">Items</h6>
              {order.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                order.map((orderItem, index) => (
                  <div key={index} className="col-md-12">
                    {orderItem.path.slice(0, 1).map((photo, photoIndex) => (
                      <div
                        id="card-items"
                        className="card mt-1 d-flex"
                        key={orderItem.order_id}
                      >
                        <div className="row">
                          <div className="card-body d-flex align-items-center">
                            <div className="col-md-3">
                              <img
                                className="img-fluid d-flex mx-auto w-50 object-fit-cover"
                                key={photoIndex}
                                src={photo.photo_path}
                                alt={`Photo ${photoIndex + 1}`}
                              />
                            </div>
                            <div className="col-md-5">
                              <h5 className="card-title fw-bold">
                                Order Id: {orderItem.order_id}
                              </h5>
                              <h6 className="card-title fw-bold">
                                Product Name :
                                {orderItem.product[0].product_name}
                                <br />
                                Category :
                                {orderItem.product[0].product_category}
                                <br />
                                Product Color : {orderItem.product_color} <br />
                                Product Size : {orderItem.product_size} <br />
                                Total Product : {orderItem.total_product}
                              </h6>
                              <div
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDeleteOrder(orderItem.order_id)
                                }
                              >
                                Delete Order
                              </div>
                            </div>
                            <div className="col-md-3">
                              <h5 className="card-title fw-bold">
                                {formatPrice(
                                  orderItem.product[0].product_price
                                )}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div id="card-summary" className="card">
              <div className="card-body">
                <h6 className="card-title fw-bold">Shopping Summary</h6>
                <div className="row mt-4 justify-content-between">
                  <div className="col-auto">
                    <h6 className="fw-normal text-muted fw-bold">
                      Total Product
                    </h6>
                  </div>
                  <div className="col-auto">
                    <h6 className="fw-bold">{totalProduct}</h6>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h6 className="fw-normal text-muted fw-bold">
                      Delivery (20.000)x{totalOrder}
                    </h6>
                  </div>
                  <div className="col-auto fw-bold">{totalDelivery}</div>
                </div>
                {/* {order.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                order.map((orderItem, index) => (
                  <div key={index}>
                    <div className="row justify-content-between">
                  <div className="col-auto">
                    <h6 className="fw-normal text-muted fw-bold">
                      {orderItem.}
                    </h6>
                  </div>
                  <div className="col-auto fw-bold">{totalDelivery}</div>
                </div>
                  </div>
                ))
              )} */}

                <hr className="solid" style={{ borderTop: "2px solid" }} />
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h6 className="fw-bold">Total</h6>
                  </div>
                  <div className="col-auto">
                    <h6 className="fw-bold" style={{ color: "#db3022" }}>
                      {/* {formatPrice(
                        product.product_price * totalProduct + 25000
                      )} */}
                      {formatPrice(totalPrice)}
                    </h6>
                  </div>
                </div>
                <button
                  id="btn-payment"
                  type="button"
                  className="btn btn-danger mt-3 border-2 border rounded-pill"
                  onClick={handleCheckOut}
                >
                  Select payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Choose Address</Accordion.Header>
              <Accordion.Body>
                {address?.length > 0 ? (
                  address.map((item, index) => (
                    <div className="container" key={index}>
                      <div className="form-check flex-column mb-3">
                        <div className="row">
                          <div className="col-1">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value={item?.address_id}
                              onChange={(e) => {
                                setSelectedAddress(item);
                              }}
                            />
                          </div>
                          <div className="col-10">
                            <h6 className="text fw-bold mb-0">
                              {item?.recipient_name} ({item?.address_name})
                            </h6>
                            <p className="text fw-bold mb-0">
                              {item?.recipient_phone_number}
                            </p>
                            <p
                              className="text mb-0"
                              style={{
                                width: "100%",
                                overflowWrap: "break-word",
                              }}
                            >
                              {item?.address_data}
                            </p>
                            <p className="text mb-0">
                              {item?.city} {item?.postal_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr
                        style={{ border: "none", borderTop: "3px solid black" }}
                      />
                    </div>
                  ))
                ) : (
                  <p>There are no addresses.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Add Address</Accordion.Header>
              <Accordion.Body>
                <form onSubmit={handleSubmitAddress}>
                  <div className="text-danger">{errMsg}</div>
                  <label for="allAddress" className="form-label">
                    Save address as (ex : home address, office address)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="allAddress"
                    placeholder="Rumah"
                    ref={address_name}
                  />
                  <label for="name" className="form-label">
                    Recipient’s name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient_name"
                    ref={recipient_name}
                  />
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    ref={address_data}
                  />
                  <label for="telphone_number" className="form-label">
                    Recipient's telephone number
                  </label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    id="telphone_number"
                    ref={recipient_phone_number}
                  />
                  <label for="postal_code" className="form-label">
                    Postal code{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="postal_code"
                    ref={postal_code}
                  />
                  <label for="city" className="form-label">
                    City or Subdistrict{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="city"
                    ref={city}
                  />
                  <button type="submit" className="btn btn-danger">
                    Add Address
                  </button>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Checkout;
