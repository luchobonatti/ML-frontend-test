import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchProducts } from "../modules/Products/productsActions";
import LoaderSpinner from "../components/Loader";
import ItemRow from "../components/ItemRow";
import Breadcrumb from "../components/Breadcrumb"

class ItemsResult extends React.Component {
  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    // Parse Query string for get search string
    const toSearch = queryString.parse(search);
    if (!!toSearch.q && toSearch.q.length) {
      this.fetchProducts(toSearch.q);
    }
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
      this.fetchProducts(newSearch);
    }
  }

  render() {
    const {
      products: { loading, error, items, categories }
    } = this.props;
    if (loading) {
      return <LoaderSpinner />;
    }
    if (error) {
      return <p>Ups, algo salió mal.</p>;
    }
    return (
      <div className="container">
        <Breadcrumb categories={categories} />
        <div
          className="item-list"
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {/*<meta itemprop="numberOfItems" value={items.length} />*/}
          {items.map(item => (
            <ItemRow key={item.id} {...item}/>
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
