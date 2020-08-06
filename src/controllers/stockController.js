const inputHelpers = require("../helpers/inputStockHelper");
const httpResponseHelper = require("../helpers/httpResponseHelper");
const daos = require("../daos/stockDao");
const stdaos = require("../daos/storeDaos");

exports.newProduct = async (req, res, next) => {
  const userId = req.id;
  const storeId = req.storeId;
  const data = req.body;
  try {
    const value = await inputHelpers.newSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findOne(input.sku, storeId)
          .then((find) => {
            if (find)
              return httpResponseHelper.error(res, {
                status: 409,
                menssage: "This sku is already in use.",
              });

            this.verifyForecast()
              .POST(input.amount, input.forecastSale, input.sku, userId)
              .then((vs) => {
                input.status = vs;
                input.storeId = storeId;
                daos()
                  .create(input)
                  .then((store) => {
                    store.status = this.verifyForecast().GET(input.status);
                    httpResponseHelper.ok(res, store);
                  })
                  .catch((error) => next(error));
              })
              .catch((error) => next(error));
          })
          .catch((error) => next(error));
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.editProduct = async (req, res, next) => {
  const sku = req.params.sku;
  const storeId = req.storeId;
  const data = req.body;
  const userId = req.id;
  try {
    const value = await inputHelpers.editSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findOne(sku, storeId)
          .then((product) => {
            if (!product)
              return httpResponseHelper.notFound(res, {
                status: 404,
                menssage: "Product not found.",
              });

            let fs = data.forecastSale
              ? data.forecastSale
              : product.dataValues.forecastSale;
            let am = data.amount ? data.amount : product.dataValues.amount;

            this.verifyForecast()
              .POST(am, fs, sku, userId)
              .then((vs) => {
                input.status = vs;
                daos()
                  .update(input, storeId, sku)
                  .then((product) => {
                    if (!product) {
                      return httpResponseHelper.notFound(res, {
                        status: 404,
                        menssage: "Product not found.",
                      });
                    }

                    httpResponseHelper.ok(res, product);
                  })
                  .catch((error) => next(error));
              })
              .catch((error) => next(error));
          });
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.oneProduct = async (req, res, next) => {
  const userId = req.id;
  const sku = req.params.sku;
  const storeId = req.storeId;
  try {
    daos()
      .findOne(sku, storeId)
      .then((product) => {
        if (!product)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Product not found.",
          });

        this.verifyForecast()
          .POST(product.amount, product.forecastSale, product.sku, userId)
          .then((vs) => {
            product.status = this.verifyForecast().GET(
              product.dataValues.status
            );
            httpResponseHelper.ok(res, product);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.allProduct = async (req, res, next) => {
  const storeId = req.storeId;
  try {
    daos()
      .findAll(storeId)
      .then((products) => {
        if (!products)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Product not found.",
          });

        httpResponseHelper.ok(res, products);
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const sku = req.params.sku;
  const storeId = req.storeId;
  try {
    daos()
      .findOne(sku, storeId)
      .then((store) => {
        if (!store)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Product not found.",
          });

        daos()
          .delete(sku, storeId)
          .then((product) => {
            if (!product)
              return httpResponseHelper.notFound(res, {
                status: 404,
                menssage: "Product not found.",
              });

            httpResponseHelper.ok(res, product);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.verifyForecast = () => {
  return {
    POST: async (amount, forecastSale, sku, userId) => {
      if (amount < forecastSale) {
      return status = 2;
      } else if (amount - forecastSale >= 20) {
        status = 1;
      } else if (amount - forecastSale >= 0 || amount - forecastSale < 20) {
          return status = 3;
      }
      return status;
    },
    GET: (status) => {
      if (status == "1") {
        status =
          "Quantity of this product in the store is sufficient for the current sales forecast";
      } else if (status == "2") {
        status =
          "Warning:: This month's sales forecast is higher than the current stock for this product in this store.";
      } else if (status == "3") {
        status =
          "Attention: Considering the current sales forecast for this store, the quantity of the current product, although sufficient, is very close to the limit.";
      }
      return status;
    },
  };
};
