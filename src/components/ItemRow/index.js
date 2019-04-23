import React from "react";
import Price from "../../components/Price";
import shippingLogo from "../../assets/images/ic_shipping.png";

export default ({
  picture,
  price: { amount },
  location,
  title,
  free_shipping
}) => (
  <article
    className="item d-flex"
    itemProp="itemListElement"
    itemScope
    itemType="http://schema.org/Product"
  >
    <picture className="image-content">
      <img itemProp="image" alt={title} src={picture} />
    </picture>

    <div className="info-content">
      <p itemProp="price" className="d-flex align-items-center">
        <Price value={amount} />
        {free_shipping && (
          <span className="shipping-icon" title="Con envío gratis!">
            <img width={18} height={18} src={shippingLogo} alt="Envío gratis a todo el país" />
          </span>
        )}
      </p>
      <span className="location">{location}</span>
      <h3 itemProp="name">{title}</h3>
    </div>
  </article>
);
