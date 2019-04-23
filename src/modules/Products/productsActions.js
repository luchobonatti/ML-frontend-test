function getProducts(searchString) {
  return fetch(`/api/items?q=${searchString}`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchProducts(searchString) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return getProducts(searchString)
      .then(json => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

function getSingleProduct(id) {
  return fetch(`/api/items/${id}`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchSingleProduct(id) {
  return dispatch => {
    dispatch(fetchSingleProductBegin());
    return getSingleProduct(id)
      .then(json => {
        dispatch(fetchSingleProductSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchSingleProductFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const FETCH_SINGLE_PRODUCT_BEGIN = "FETCH_SINGLE_PRODUCT_BEGIN";
export const FETCH_SINGLE_PRODUCT_SUCCESS = "FETCH_SINGLE_PRODUCT_SUCCESS";
export const FETCH_SINGLE_PRODUCT_FAILURE = "FETCH_SINGLE_PRODUCT_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = response => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { ...response.data, error: response.error }
  };
};

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const fetchSingleProductBegin = () => ({
  type: FETCH_SINGLE_PRODUCT_BEGIN
});

export const fetchSingleProductSuccess = response => {
  return {
    type: FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: { ...response.data, error: response.error }
  };
};

export const fetchSingleProductFailure = error => ({
  type: FETCH_SINGLE_PRODUCT_FAILURE,
  payload: { error }
});
