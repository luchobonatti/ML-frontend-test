import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import searchIcon from "../../assets/images/ic_Search.png";
import queryString from "query-string";

let Search = ({ dispatch }) => {
  let input;
  const searchString = () => {
    const toSearch = queryString.parse(window.location.search);
    return !!toSearch.q ? toSearch.q : null;
  };

  const handleClearInput = () => {
    input.value = "";
    if (window.location.pathname !== "/") {
      dispatch(push(`/`));
    }
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (input.value !== "") {
          dispatch(push(`/items?q=${input.value}`));
        }
      }}
    >
      <div className="input-container">
        <input
          placeholder="Nunca dejes de buscar"
          type="text"
          required
          ref={node => {
            input = node;
          }}
          defaultValue={searchString()}
        />
        <button
          type="button"
          className="clear"
          onClick={() => handleClearInput()}
        >
          &times;
        </button>
      </div>
      <button>
        <img src={searchIcon} alt="Buscar" />
      </button>
    </form>
  );
};

export default connect()(Search);
