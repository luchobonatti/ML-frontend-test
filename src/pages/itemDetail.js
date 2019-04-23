import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../modules/Products/productsActions";

class ItemDetail extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      dispatch
    } = this.props;
    dispatch(fetchSingleProduct(id));
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  null
)(ItemDetail);
