import React from "react";
import { NavLink } from "react-router-dom";
function NavbarOrder() {
  return (
    <>
      <div className="row mt-3 my-order-nav">
        <div className="col-12 text-link text-decoration-none">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/all-items"
          >
            All items
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/not-yet-paid"
          >
            Not yet paid
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/packed"
          >
            Packed
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/sent"
          >
            Sent
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/completed"
          >
            Completed
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? " text-decoration-none"
                : isActive
                ? "text-on text-decoration-none"
                : "text-decoration-none"
            }
            to="/order-cancel"
          >
            Order cancel
          </NavLink>
        </div>
      </div>
      <hr />
    </>
  );
}

export default NavbarOrder;
