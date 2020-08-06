const httpResponseHelper = require("../helpers/httpResponseHelper");
const daos = require("../daos/storeDaos");

exports.verifyStoreOwner = async (req, res, next) => {
  const ownerId = req.id;
  const storeId = req.params.storeId;
  try {
    daos()
      .findById(storeId, ownerId)
      .then((find) => {
        if (!find)
          return httpResponseHelper.error(res, {
            status: 409,
            menssage: "Store not found.",
          });

        req.storeId = find.dataValues.storeId;
        next();
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};
