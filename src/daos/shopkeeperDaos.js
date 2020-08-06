const models = require("../models")["shopkeeper"]
const logger = require("../helpers/loggerHelp")

module.exports = () => {
  return {
    findOne: async (email) => {
      return new Promise((resolve, reject) => {
        models
          .findOne({ where: { email: email } })
          .then((ok) => {
            logger.info("[ShopkeeperDAO] Search done successfully");
            //  return ok
            resolve(ok);
          })
          .catch((err) => {
            logger.error(
              "[ShopkeeperDAO] An error has occurred while find a email",
              err
            );
            reject(err);
          });
      });
    },
    findById: async (id) => {
      return new Promise((resolve, reject) => {
        models
          .findOne({ id }, { where: { userId: id } })
          .then((ok) => {
            logger.info("[ShopkeeperDAO] Search done successfully");
            //  return ok
            resolve(ok);
          })
          .catch((err) => {
            logger.error(
              "[ShopkeeperDAO] An error has occurred while find a email",
              err
            );
            reject(err);
          });
      });
    },
    create: (shopkeeper) => {
      shopkeeper = models.build(shopkeeper);
      return new Promise((resolve, reject) => {
        logger.info(
          "[ShopkeeperDAO] Creating a new user",
          JSON.stringify(shopkeeper)
        );
        models
          .create(shopkeeper.dataValues)
          .then((usr) => {
            logger.info(
              "[ShopkeeperDAO] The user has been created succesfully",
              JSON.stringify(usr)
            );
            return usr;
          })
          .then(resolve)
          .catch((err) => {
            logger.error(
              "[ShopkeeperDAO] An error has ocurred while saving a new user",
              err
            );
            reject({
              status: 422,
              message: err.message,
            });
          });
      });
    },
    update: (shopkeeper, id) => {
      return new Promise((resolve, reject) => {
        logger.info("[ShopkeeperDAO] Update an item");
        models
          .update(shopkeeper, { where: { userId: id } })
          .then((item) => {
            logger.info(
              "[ShopkeeperDAO] The item has been updated succesfully"
            );
            //  logger.debug(JSON.stringify(item.toObject()));
            resolve({
              status: 200,
              message: "The user has been updated succesfully",
            });
          })
          .catch(function (error) {
            logger.error(
              "[ShopkeeperDAO] An error has ocurred while updating an item",
              error
            );
            reject({
              status: 422,
              message: error,
            });
          });
      });
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        models
          .destroy({
            where: {
              userId: id,
            },
          })
          .then((res) => {
            logger.info(
              "[AddresseDAO] The items have been deleted succesfully"
            );
            resolve({
              status: 200,
              message: "The user has been deleted succesfully",
            });
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
