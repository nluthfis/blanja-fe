import React from "react";
import "../style/pages/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../reducers/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const state = useSelector((reducer) => reducer.auth);

  React.useEffect(() => {
    if (localStorage.getItem("auth") === "true" || state.auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    // show loading before axios finish
    Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/customer/login`, {
        user_email: email,
        user_password: password,
      })
      .then((result) => {
        Swal.fire({
          title: "Login Success",
          text: "Login success, redirect to app...",
          icon: "success",
        }).then(() => {
          console.log(result);
          localStorage.setItem("auth", "true");
          localStorage.setItem("userId", result?.data?.data[0].user_id);
          localStorage.setItem("userName", result?.data?.data[0].user_name);
          localStorage.setItem("userPhoto", result?.data?.data[0].user_photo);
          localStorage.setItem("token", result?.data?.token);
          dispatch(addAuth(result));
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Login Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-xs-12">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="rounded mx-auto d-block mb-4"
            />

            <p className="text-center mb-5">
              <b>Please login with your account</b>
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
                id="custommer"
                autoComplete="off"
                checked
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
                name="btnradio"
                id="seller"
                autoComplete="off"
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
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label"
                ></label>
                <input
                  type="password"
                  className="form-control  form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <small>
                <Link
                  to={"/forget.html"}
                  className="d-block text-decoration-none text-right text-danger mt-3"
                >
                  Forgot Password
                </Link>
              </small> */}

              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg rounded-pill"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>

            <small className="d-block text-center text-muted mt-4">
              Don’t have a account?
              <Link
                className="text-danger text-decoration-none"
                to={"/register"}
              >
                Register
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
