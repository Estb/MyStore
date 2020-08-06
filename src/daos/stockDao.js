const models = require("../models")["stock"];
const logger = require("../helpers/loggerHelp")

module.exports = () => {
  return {
    findOne: async (sku, storeId) => {
      return new Promise((resolve, reject) => {
        models
          .findOne({ where: {sku:sku, storeId:storeId} })
          .then((ok) => {
            logger.info("[StokDAO] Search done successfully");
            //  return ok
            resolve(ok);
          })
          .catch((err) => {
            logger.error(
              "[StokDAO] An error has occurred while find a email",
              err
            );
            reject(err);
          });
      });
    },
    findAll: async (storeId) => {
      return new Promise((resolve, reject) => {
        models
          .findAll({ where: {storeId:storeId} })
          .then((item) => {
            if (item.length === 0) {
              logger.info('[StockDAO] Item not found');
              resolve(null);
            } else {
              logger.info('[StockDAO] The item was found');
              resolve(item);
            }
          })
          .catch((err) => {
            logger.error(
              "[StockDAO] An error has occurred while find",
              err
            );
            reject(err);
          });
      });
    },
    findAll2: async (sku, ) => {
      return new Promise((resolve, reject) => {
        models
          .findAll({ where: {storeId:storeId} })
          .then((item) => {
            if (item.length === 0) {
              logger.info('[StockDAO] Item not found');
              resolve(null);
            } else {
              logger.info('[StockDAO] The item was found');
              resolve(item);
            }
          })
          .catch((err) => {
            logger.error(
              "[StockDAO] An error has occurred while find",
              err
            );
            reject(err);
          });
      });
    },
    create: (product) => {
      let user = models.build(product);
      return new Promise((resolve, reject) => {
        logger.info("[StockDAO] Creating a new Product",
        JSON.stringify(product));
        models
          .create(product)
          .then((str) => {
            logger.info(
              "[StockDAO] The Product has been created succesfully",
              JSON.stringify(str)
            );
            return str;
          })
          .then(resolve)
          .catch((err) => {
            logger.error(
              "[StockDAO] An error has ocurred while saving a new Product",
              err
            );
            reject({
              status: 422,
              message: err.message,
            });
          });
      });
    },
    update: (product, storeId, sku) => {
      return new Promise((resolve, reject) => {
        logger.info("[StockDAO] Update an item");
        models
          .update(product, { where: { storeId:storeId, sku:sku} })
          .then((item) => {
            if (item[0]==0) {
              logger.info('[StockDAO] Item not found');
              resolve(null);
            } else {
              logger.info('[StockDAO] The item was found');
              resolve({status:200, menssage: "The Product has been Updated"});
            }
          })
          .catch(function (error) {
            logger.error(
              "[StockDAO] An error has ocurred while updating",
              error
            );
            reject({
              status: 422,
              message: error,
            });
          });
      });
    },
    delete: (sku , storeId )=> {
      return new Promise((resolve, reject) => {
        models
          .destroy({
            where: {
              sku: sku,
              storeId:storeId
            },
          })
          .then((res) => {
            if(res) {
            logger.info(
              "[StockDAO] The Product have been deleted succesfully"
            );
            resolve({
              status: 200,
              message: "The product has been deleted succesfully",
            });
          } else {
            "[StockDAO] Not Found the product for delete",
            resolve(null)
          }
          })
          .catch((error) => {
            logger.error(
              "[StockDAO] An error has occurred while deleting this item",
              error
            );
            reject({
              status: 422,
              message: error,
            });
          });
      });
    },
  };
};
