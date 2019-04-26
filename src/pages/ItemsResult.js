import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchProducts } from "../modules/Products/productsActions";
import LoaderSpinner from "../components/Loader";
import ItemRow from "../components/ItemRow";
import Breadcrumb from "../components/Breadcrumb";

class ItemsResult extends React.Component {
  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    this.fetchProducts(this.getSearchQueryString(search));
  }

  fetchProducts(searchString) {
    const { dispatch } = this.props;
    dispatch(fetchProducts(searchString));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      location: { search: newSearch }
    } = this.props;
    const {
      location: { search: oldSearch }
    } = prevProps;

    if (oldSearch !== newSearch) {
      this.fetchProducts(this.getSearchQueryString(newSearch));
    }
  }

  getSearchQueryString = string => {
    // Parse Query string for get search string
    const toSearch = queryString.parse(string);
    if (!!toSearch.q) return toSearch.q;
    return false;
  };

  render() {
    const {
      products: { loadingItems: loading, error, items, categories },
    } = this.props;
    if (loading) {
      return <LoaderSpinner />;
    }
    if (error) {
      return <p className="py-4 text-center">Ups, algo salió mal.</p>;
    }

    if (!items.length) {
      return (
        <h3 className="py-5 text-center">
          No hay publicaciones que coincidan con tu búsqueda.
        </h3>
      );
    }

    return (
      <div className="container">
        <Breadcrumb categories={categories} />
        <div
          className="item-list"
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {items.map(item => (
            <ItemRow key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return {
    products
  };
};

export default connect(
  mapStateToProps,
  null
)(ItemsResult);
