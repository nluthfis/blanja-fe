import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../style/pages/ShipingAdress.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShipingAddres() {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const address_name = useRef();
  const recipient_name = useRef();
  const recipient_phone_number = useRef();
  const address_data = useRef();
  const postal_code = useRef();
  const city = useRef();

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/address`)
      .then((result) => {
        setLoading(false);
        setShippingAddress(result?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
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
        console.log(result);
        Swal.fire({
          title: "Success",
          text: "Success Add Address!",
          icon: "success",
        });
        getAddress();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Failed",
          text: err?.response?.data?.message
            ? err.response.data.message
            : "Failed Add Address",
          icon: "error",
        });
      });
  };

  const handleDeleteAddress = (addressId) => {
    const token = localStorage.getItem("token");
    console.log(`Delete Address: ${addressId}`);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/address/delete_address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          adds_id: addressId,
        },
      })
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "Address Deleted!",
          icon: "success",
        });
        getAddress();
        setShippingAddress(result?.data?.data);
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
    <div className="profile" style={{ overflowX: "hidden" }}>
      <Navbar />
      <Sidebar />

      <main id="shipping-address">
        <div className="page-content ">
          <div className="custom-button">
            <div className="container-fluid">
              <h4>Choose another address</h4>
              <p>Manage your shipping address</p>
              <hr />

              {/* Button to open the modal */}

              <button
                type="button"
                id="custom-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Address
              </button>

              {/* Bootstrap Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                data-bs-backdrop="false"
                data-bs-keyboard="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal Title
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmitAddress}>
                        {/* ini atas untuk row */}
                        <div className="row">
                          {/* ini dalam untuk row */}
                          <div className="mb-2 ">
                            <label htmlFor="allAddress" className="form-label">
                              Save address as (ex : home address, office
                              address)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="allAddress"
                              placeholder="Rumah"
                              ref={address_name}
                            />
                          </div>

                          <div className="col-md-6 ">
                            <div className="mb-2 ">
                              <label htmlFor="name" className="form-label">
                                Recipient’s name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                ref={recipient_name}
                              />
                            </div>

                            <div className="mb-2 ">
                              <label htmlFor="address" className="form-label">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                ref={address_data}
                              />
                            </div>
                          </div>

                          <div className="mb-2 col-md-6">
                            <label
                              htmlFor="telphone_number"
                              className="form-label"
                            >
                              Recipient's telephone number
                            </label>
                            <input
                              type="number"
                              className="form-control mb-2"
                              id="telphone_number"
                              ref={recipient_phone_number}
                            />

                            <label htmlFor="postal_code" className="form-label">
                              Postal code{" "}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="postal_code"
                              ref={postal_code}
                            />
                          </div>

                          <div className="mb-2 col-md-6">
                            <label htmlFor="city" className="form-label">
                              City or Subdistrict{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control mb-2"
                              id="city"
                              ref={city}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 
            {
              shippingAddress?.length > 0 ? (
                shippingAddress.map((item, index) => (
                  <div className="box-address mt-2 mb-2" key={index}>
                    <h4 style={{ color: "black" }}>{item.recipient_name}</h4>
                    <p>
                      {item.address_data}, {item.city},{" "}
                      <span>Postal Code: {item.postal_code}</span>
                      <span>Recipient's Phone: {item.recipient_phone_number}</span>
                    </p>
                    <button className="btn btn-change-address" onClick={() => handleDeleteAddress(item.address_id)}>Delete address</button>
                  </div>
                ))
              ) : (
                <>
                  <p>Address Not Found</p>
                </>
              )
            } */}

            {!loading ? (
              shippingAddress?.length > 0 ? (
                shippingAddress.map((item, index) => (
                  <div className="box-address mt-2 mb-2" key={index}>
                    <h4 style={{ color: "black" }}>{item.recipient_name}</h4>
                    <p>
                      {item.address_data || <Skeleton />},{" "}
                      {item.city || <Skeleton />},{" "}
                      <span>
                        Postal Code: {item.postal_code || <Skeleton />}
                      </span>
                      <span>
                        Recipient's Phone:{" "}
                        {item.recipient_phone_number || <Skeleton />}
                      </span>
                    </p>
                    <button
                      className="btn btn-change-address"
                      onClick={() => handleDeleteAddress(item.address_id)}
                    >
                      Delete address
                    </button>
                  </div>
                ))
              ) : (
                <p className="fw-bold fs-4 text-center text-danger mt-2">
                  Address Not Found
                </p>
              )
            ) : (
              <>
                <div className="box-address mt-2 mb-2">
                  <h4 style={{ color: "black" }}>{<Skeleton width={300} />}</h4>
                  <p>
                    {<Skeleton width={300} />},{" "}
                    <span>{<Skeleton width={300} />}</span>
                    <span>{<Skeleton width={300} />}</span>
                  </p>
                  <button className="btn btn-change-address">
                    {<Skeleton width={100} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ShipingAddres;
