import React from "react";

export default ({ categories }) => (
  <nav className="breadcrumb-container">
    <ol className="breadcrumb m-0 p-0">
      {categories.map((c, i) => (
        <li key={i} className="breadcrumb-item">
          <span>{c}</span>
        </li>
      ))}
    </ol>
  </nav>
);
