/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/components/Sidebar.scss";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
function Sidebar({ loading }) {
  const userPhoto = localStorage.getItem("userPhoto");
  const userName = localStorage.getItem("userName");
  const roles_id = Number(localStorage.getItem("roles_id"));

  return (
    <>
      {/* This is sidebar START */}
      <main id="sidebar-page">
        <div className="body-background">
          <div className="header">
            <div className="sidebar">
              <div className="d-flex align-items-center ms-3">
                <div className="ms-5">
                  {!loading ? (
                    userPhoto ? (
                      <img
                        className="object-fit-cover rounded-circle"
                        src={userPhoto}
                        height="70"
                        width="70"
                        alt="User Profile Picture"
                      />
                    ) : (
                      "Not Defined"
                    )
                  ) : (
                    <Skeleton width={75} height={75} circle={true} />
                  )}
                </div>

                <div>
                  <h5 className="h5 ms-3 align-items-center ">
                    {!loading ? (
                      userName ? (
                        userName
                      ) : (
                        "Not Defined"
                      )
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </h5>
                  <Link
                    className="li text-decoration-none text-black"
                    to="/profile?act=update"
                  >
                    <FontAwesomeIcon
                      id="ic-pencil"
                      className="ic hide-on-mobile ms-3 me-1"
                      icon="pencil"
                      size="lg"
                      style={{ color: "black" }}
                    />
                    Ubah
                  </Link>
                </div>
              </div>

              <div
                className="mt-5 d-flex flex-column justify-content-center"
                id="side-link-list"
              >
                <div className="row align-items-center ms-5 mt-2 mb-2">
                  <div className="col-auto pr-3">
                    <NavLink to="/profile">
                      <img src="/assets/img/user.png" alt="User Icon" />
                    </NavLink>
                  </div>
                  <div className="col">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        `text-decoration-none text-dark ${
                          isActive ? "side-link-active" : ""
                        } ${isPending ? "" : "hide-on-mobile"}`
                      }
                      to="/profile"
                    >
                      My account
                    </NavLink>
                  </div>
                </div>
                {roles_id === 1 && (
                  <div className="row align-items-center ms-5 mt-2 mb-2">
                    <div className="col-auto pr-3">
                      <NavLink to="/shipping-address">
                        <img
                          src="/assets/img/location.png"
                          alt="Location Icon"
                        />
                      </NavLink>
                    </div>
                    <div className="col">
                      <NavLink
                        className={({ isActive, isPending }) =>
                          `text-decoration-none text-dark ${
                            isActive ? "side-link-active" : ""
                          } ${isPending ? "" : "hide-on-mobile"}`
                        }
                        to="/shipping-address"
                      >
                        Shipping Address
                      </NavLink>
                    </div>
                  </div>
                )}

                <div className="row align-items-center ms-5 mt-2 mb-2">
                  <div className="col-auto pr-3">
                    <NavLink to="/my-order">
                      <img src="/assets/img/history.png" alt="History Icon" />
                    </NavLink>
                  </div>
                  <div className="col">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        `text-decoration-none text-dark ${
                          isActive ? "side-link-active" : ""
                        } ${isPending ? "" : "hide-on-mobile"}`
                      }
                      to="/my-order"
                    >
                      My order
                    </NavLink>
                  </div>
                </div>
                {roles_id === 2 && (
                  <div>
                    <div className="row align-items-center ms-5 mt-2 mb-2">
                      <div className="col-auto pr-3">
                        <NavLink to="/">
                          <img
                            src="/assets/img/history.png"
                            alt="History Icon"
                          />
                        </NavLink>
                      </div>
                      <div className="col">
                        <NavLink
                          className={({ isActive, isPending }) =>
                            `text-decoration-none text-dark ${
                              isActive ? "side-link-active" : ""
                            } ${isPending ? "" : "hide-on-mobile"}`
                          }
                          to="/product"
                        >
                          Product
                        </NavLink>
                      </div>
                    </div>
                    <div className="row align-items-center ms-5 mt-3 mb-2">
                      <div className="col-auto pr-3">
                        <NavLink to="/">
                          <img
                            src="/assets/img/history.png"
                            alt="History Icon"
                          />
                        </NavLink>
                      </div>
                      <div className="col">
                        <NavLink
                          className={({ isActive, isPending }) =>
                            `text-decoration-none text-dark ${
                              isActive ? "side-link-active" : ""
                            } ${isPending ? "" : "hide-on-mobile"}`
                          }
                          to="/my-added-product"
                        >
                          My Product
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* This is sidebar END */}
    </>
  );
}

export default Sidebar;
