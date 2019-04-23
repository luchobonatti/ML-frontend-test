import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import products from "./Products/productsReducers";

export default history =>
  combineReducers({
    router: connectRouter(history),
    products
  });
