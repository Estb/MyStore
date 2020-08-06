const models = require("../models")["store"];
const logger = require("../helpers/loggerHelp")

module.exports = () => {
  return {
    findOne: async (cnpj) => {
      return new Promise((resolve, reject) => {
        models
          .findOne({ where: { cnpj: cnpj } })
          .then((ok) => {
            if(ok){
            logger.info("[StoreDAO] Search done successfully");
            //  return ok
            resolve(ok);
            } else {
              logger.info("[StoreDAO] Item not Found");
              resolve(null);
            } 
          })
          .catch((err) => {
            logger.error(
              "[StoreDAO] An error has occurred while find a email",
              err
            );
            reject(err);
          });
      });
    },
    findAll: async (shopkeeper) => {
      return new Promise((resolve, reject) => {
        models
          .findAll({ where: {userId:shopkeeper} })
          .then((item) => {
            if (item.length === 0) {
              logger.info('[StoreDAO] Item not found');
              resolve(null);
            } else {
              logger.info('[StoreDAO] The item was found');
              resolve(item);
            }
          })
          .catch((err) => {
            logger.error(
              "[StoreDAO] An error has occurred while find",
              err
            );
            reject(err);
          });
      });
    },
    findById: async (id, shopkeeper) => {
      return new Promise((resolve, reject) => {
        models
          .findOne({
            where: {
            storeId: id,
            userId:shopkeeper }
            })
          .then((item) => {
            if (!item) {
              logger.info('[StoreDAO] Item not found');
              resolve(null);
            } else {
              logger.info('[StoreDAO] The item was found');
              resolve(item);
            }
          })
          .catch((err) => {
            logger.error(
              "[StoreDAO] An error has occurred while findById",
              err
            );
            reject(err);
          });
      });
    },
    create: (store) => {
      let user = models.build(store);
      return new Promise((resolve, reject) => {
        logger.info("[StoreDAO] Creating a new store", JSON.stringify(store));
        models
          .create(store)
          .then((str) => {
            logger.info(
              "[StoreDAO] The store has been created succesfully",
              JSON.stringify(str)
            );
            return str;
          })
          .then(resolve)
          .catch((err) => {
            logger.error(
              "[StoreDAO] An error has ocurred while saving a new store",
              err
            );
            reject({
              status: 422,
              message: err.message,
            });
          });
      });
    },
    update: (datos, storeId, shopkeeper) => {
      return new Promise((resolve, reject) => {
        logger.info("[StoreDAO] Update an item");
        models
          .update(datos, { where: { storeId:storeId , userId:shopkeeper} })
          .then((item) => {
            logger.info("[StoreDAO] The store has been updated succesfully");
            //  logger.debug(JSON.stringify(item.toObject()));
            resolve({
              status: 200,
              message: "The store has been updated succesfully",
            });
          })
          .catch(function (error) {
            logger.error(
              "[StoreDAO] An error has ocurred while updating",
              error
            );
            reject({
              status: 422,
              message: error,
            });
          });
      });
    },
    delete: (id, shopkeeper) => {
      return new Promise((resolve, reject) => {
        models
          .destroy({
            where: {
              storeId: id,
              userId:shopkeeper
            },
          })
          .then((res) => {
            if(res){
            logger.info(
              "[AddresseDAO] The store have been deleted succesfully"
            );
            resolve({
              status: 200,
              message: "The store has been deleted succesfully",
            });
          } else {
            "[AddresseDAO] Store not found to delete"
            resolve(null)
          }
          })
          .catch((error) => {
            logger.error(
              "[AddresseDAO] An error has occurred while deleting all items",
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
