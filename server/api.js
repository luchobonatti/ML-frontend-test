const express = require("express");
const axios = require("axios");
const { itemsParser, itemDetailsParser } = require("./responseParser");

const router = express.Router();

const MLRequester = axios.create({
  baseURL: "https://api.mercadolibre.com"
});

router.get("/items", async ({ query: { q } }, res, next) => {
  if (!q) {
    res
      .status(500)
      .send({ error: "You must provide search string!", data: [] });
  }
  try {
    const {
      data: { results, filters }
    } = await MLRequester.get(`sites/MLA/search?q=${q}&limit=4`);

    res.send({ error: false, data: itemsParser({ results, filters }) });
  } catch (err) {
    next(err.data);
  }
});

router.get("/items/:id", async ({ params: { id } }, res, next) => {
  try {
    const [{ data: detail }, { data: description }] = await Promise.all([
      MLRequester.get(`items/${id}`),
      MLRequester.get(`items/${id}/description`)
    ]);

    const { data: category } = await MLRequester.get(
      `/categories/${detail.category_id}`
    );

    res.send(
      itemDetailsParser({
        detail,
        description,
        category
      })
    );
  } catch (err) {
    next(err.data);
  }
});

module.exports = router;
