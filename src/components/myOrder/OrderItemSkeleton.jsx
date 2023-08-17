import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function OrderItemSkeleton() {
  return (
    <li>
      <div className="order-details">
        <h2>
          <Skeleton width={500} />
        </h2>
        <p>
          <Skeleton width={300} />
        </p>
        <p>
          <Skeleton width={300} />
        </p>
        <p>
          <Skeleton width={300} />
        </p>
        <p className="success-message">
          <Skeleton width={100} />
        </p>
      </div>
    </li>
  );
}

export default OrderItemSkeleton;
