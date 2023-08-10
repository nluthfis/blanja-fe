import React, { useState, useEffect } from "react";
import "../style/pages/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [userType, setUserType] = useState("customer");

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/");
    }
  }, []);

  const handleRegister = () => {
    Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const registrationEndpoint =
      userType === "customer"
        ? `${process.env.REACT_APP_BASE_URL}/register/customer`
        : `${process.env.REACT_APP_BASE_URL}/register/seller`;

    const registrationData = {
      user_name: name,
      user_email: email,
      user_phonenumber: phone_number,
      user_password: password,
      ...(userType === "seller" && { name_store: storeName }),
    };

    console.log(registrationData);

    axios
      .post(registrationEndpoint, registrationData)
      .then((result) => {
        Swal.fire({
          title: "Register Success",
          text: "Register success, please login...",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        console.log(error.response);
        Swal.fire({
          title: "Register Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
          confirmButtonText: "Ok",
          allowOutsideClick: false,
          timer: 3000,
        });
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-xs-12">
            <img
              src="./assets/logo.png"
              alt="logo"
              className="rounded mx-auto d-block mb-4"
            />

            <p className="text-center mb-5">
              <b>Please sign up with your account</b>
            </p>
            <div
              className="btn-group position-relative top-0 start-50 translate-middle mx-auto mt-3"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                value="custommer"
                id="custommer"
                autoComplete="off"
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
              />

              <label
                style={{ height: "50px", width: "150px" }}
                className="btn btn-outline-danger btn-lg"
                htmlFor="custommer"
              >
                Custommer
              </label>

              <input
                type="radio"
                className="btn-check"
                value="seller"
                name="btnradio"
                id="seller"
                autoComplete="off"
                checked={userType === "seller"}
                onChange={() => setUserType("seller")}
              />
              <label
                style={{ height: "50px", width: "150px" }}
                className="btn btn-outline-danger btn-lg"
                htmlFor="seller"
              >
                Seller
              </label>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div>
                <label htmlFor="name" className="form-label"></label>
                <input
                  type="name"
                  className="form-control form-control-lg"
                  id="name"
                  aria-describedby="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label"
                ></label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="exampleInputPhone"
                  className="form-label"
                ></label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label"
                ></label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {userType === "seller" && (
                <div>
                  <label htmlFor="name_store" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name_store"
                    aria-describedby="name_store"
                    placeholder="Store Name"
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
              )}

              <div className="d-grid mt-5">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg rounded-pill"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>

            <small className="d-block text-center text-muted mt-4">
              Already have a account?
              <Link className="text-danger text-decoration-none" to={"/login"}>
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
