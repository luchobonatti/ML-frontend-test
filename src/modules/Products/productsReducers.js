import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_SINGLE_PRODUCT_BEGIN,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE
} from "./productsActions";

const initialState = {
  items: [],
  loadingItems: false,
  error: null,
  categories: [],
  author: [],
  item: {},
  loadingItem: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        loadingItem: true,
        error: null
      };

    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loadingItems: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadingItems: false,
        ...action.payload
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loadingItems: false,
        error: action.payload.error
      };

    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingItem: false,
        ...action.payload
      };

    case FETCH_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loadingItem: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
