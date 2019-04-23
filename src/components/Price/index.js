import React from "react";
import CurrencyFormat from "react-currency-format";

export default ({ value }) => (
  <CurrencyFormat
    value={value}
    displayType="text"
    thousandSeparator="."
    decimalSeparator=","
    prefix="$ "
  />
);
