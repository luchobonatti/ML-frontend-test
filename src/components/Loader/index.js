import React from "react";

export default ({ height = 150 }) => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ height }}
  >
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
