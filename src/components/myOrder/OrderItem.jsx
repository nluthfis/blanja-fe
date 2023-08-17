import React from "react";

function OrderItem({ orderItem }) {
  return (
    <li>
      <>
        {orderItem.path.slice(0, 1).map((photo, photoIndex) => (
          <img
            className="img-responsive object-fit-cover"
            src={photo.photo_path}
            alt="Product"
            key={photoIndex}
          />
        ))}
        <div className="order-details">
          <h2>Order ID: {orderItem.order_id}</h2>
          <p>Product: {orderItem.product[0].product_name}</p>
          <p>Quantity: {orderItem.total_product}</p>
          <p>Harga: {orderItem.total_price}</p>
          <p className="success-message">Success</p>
        </div>
      </>
    </li>
  );
}

export default OrderItem;
