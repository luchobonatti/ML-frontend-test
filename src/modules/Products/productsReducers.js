import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE, FETCH_SINGLE_PRODUCT_BEGIN, FETCH_SINGLE_PRODUCT_SUCCESS, FETCH_SINGLE_PRODUCT_FAILURE
} from "./productsActions";

const initialState = {
  items: [],
  loading: true,
  error: null,
  categories: [],
  author: [],
  item: {}
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case FETCH_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
      };

    case FETCH_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
