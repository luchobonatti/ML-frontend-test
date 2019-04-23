import React from "react";
import Search from "../Search";
import logo from "./../../assets/images/Logo_ML.png";
import { NavLink } from "react-router-dom";

export default () => (
  <header className="main-header">
    <div className="container h-100">
      <div className="d-flex align-items-center h-100">
        <NavLink to="/" className="pr-3">
          <img src={logo} alt="Mercado Libre" />
        </NavLink>
        <div className="search-container">
          <Search />
        </div>
      </div>
    </div>
  </header>
);
