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

        product.status = this.verifyForecast().GET(product.status);

        httpResponseHelper.ok(res, product);
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
        products.map(element =>{
        element.status = this.verifyForecast().GET(element.status);
        })
        
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
  let am = 0;
  let fs = 0;

  __check = async (sku, userId) => {
    let t;
    const p1 = await new Promise(async (resolve, reject) => {
      await stdaos()
        .findAll(userId)
        .then((stores) => {
          let i = 0;
          stores.forEach(async (element) => {
            await daos()
              .findOne(sku, element.storeId)
              .then((prod) => {
                if (prod) {
                  if (prod.status == "1") {
                    am += prod.amount;
                    fs += prod.forecastSale;
                  }
                }
              })
              .finally(() => {
                i++;
                if (i == stores.length) {
                  resolve();
                }
              });
          });
        });
    });
    const p2 = await new Promise((resolve) => {
      resolve((t = am - fs > 0 ? "2" : "1"));
    });
    const promises = [p1, p2];
    await Promise.all(promises)
    return t;
  };
  return {
    POST: async (amount, forecastSale, sku, userId) => {
      if (amount < forecastSale) {
        var ns = await __check(sku, userId);
        return (status = 2 + ns);
      } else if (amount - forecastSale >= 20) {
        status = 1;
      } else if (amount - forecastSale >= 0 || amount - forecastSale < 20) {
        var ns = await __check(sku, userId);
        return (status = 3 + ns);
      }
      return status;
    },
    GET: (status) => {
      if (status == "1") {
        status =
          "Quantity of this product in the store is sufficient for the current sales forecast";
      } else if (status == "21") {
        status =
          "Warning:: This month's sales forecast is higher than the current stock for this product in this store. You don't have enough stock available at another store.";
      } else if (status == "22") {
        status =
          "Warning:: This month's sales forecast is higher than the current stock for this product in this store. You have this product available with stock in another store";
      } else if (status == "31") {
        status =
          "Attention: Considering the current sales forecast for this store, the quantity of the current product, although sufficient, is very close to the limit. You don't have enough stock available at another store.";
      } else if (status == "32") {
        status =
          "Attention: Considering the current sales forecast for this store, the quantity of the current product, although sufficient, is very close to the limit. You have this product available with stock in another store.";
      }
      return status;
    },
  };
};
