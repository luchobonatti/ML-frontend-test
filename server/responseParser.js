const author = {
  name: "Luciano",
  lastName: "Bonatti"
};

const itemsParser = ({ results, filters }) => {
  // Map Meli API results [] to internal app API array.
  const items = results.map(result => {
    return {
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price
      },
      picture: result.thumbnail,
      pictures: result.pictures,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
      location: result.address.state_name
    };
  });
  // Build json categories structure from path_from_root API array.
  const categories = [];

  if (!!filters[0]) {
    const { path_from_root } = filters[0].values[0];
    path_from_root.map(category => categories.push(category.name));
  }

  return { author, categories, items };
};

const itemDetailsParser = item => {
  const { detail, description, category } = item;
  const parsedItem = {
    id: detail.id,
    title: detail.title,
    price: {
      currency: detail.currency_id,
      amount: detail.price,
      decimals: countDecimals(detail.price)
    },
    picture: detail.pictures[0].url,
    condition: detail.condition,
    free_shipping: detail.shipping.free_shipping,
    sold_quantity: detail.sold_quantity,
    description: description.plain_text
  };

  // Json categories for breadcrumb.
  const parsedCategories = [];

  if (category.path_from_root.length) {
    const { path_from_root: pathFromRoot } = category;
    pathFromRoot.map(category => parsedCategories.push(category.name));
  }

  return { author, item: parsedItem, categories: parsedCategories };
};

const countDecimals = function(value) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

module.exports = {
  itemsParser,
  itemDetailsParser
};
