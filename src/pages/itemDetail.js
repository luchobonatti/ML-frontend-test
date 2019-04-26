import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../modules/Products/productsActions";
import Breadcrumb from "./../components/Breadcrumb";
import LoaderSpinner from "./../components/Loader";
import Price from "../components/Price";

class ItemDetail extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      dispatch
    } = this.props;
    dispatch(fetchSingleProduct(id));
  }

  getCondition = condition => {
    switch (condition) {
      case "used":
        return "Usado";
      default:
        return "Nuevo";
    }
  };

  render() {
    const {
      products: { item, author, categories, loadingItem, error }
    } = this.props;
    if (loadingItem) {
      return <LoaderSpinner />;
    }

    if (error) {
      return (
        <p className="py-4 text-center">
          La publicacion del producto que intentas ver parece que ya no está
          disponible
        </p>
      );
    }

    return (
      <div className="container">
        <div className="container">
          <Breadcrumb categories={categories} />
          <div className="product-detail">
            <div className="row">
              <div className="col-7">
                <picture className="d-flex align-items-center justify-content-center">
                  <span>
                    <img src={item.picture} alt={item.title} />
                  </span>
                </picture>
                <div className="product-description mt-5">
                  <h4>Descripción del producto</h4>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="col-5">
                <div className="content">
                  <p className="condition">
                    {`${this.getCondition(item.condition)} - ${
                      item.sold_quantity
                    } vendidos`}
                  </p>
                  <h3 className="title">{item.title}</h3>
                  <h3 className="price">
                    {item.price && (
                      <Price className="price" value={item.price.amount} />
                    )}
                  </h3>
                  <a href="#" className="btn btn-primary">
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          </div>
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
)(ItemDetail);
