const inputHelpers = require("../helpers/inputStoreHelper");
const httpResponseHelper = require("../helpers/httpResponseHelper");
const daos = require("../daos/storeDaos");

exports.newStore = async (req, res, next) => {
  const userId = req.id;
  const data = req.body;
  try {
    const value = await inputHelpers.newSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findOne(input.cnpj)
          .then((find) => {
            if (find)
              return httpResponseHelper.error(res, {
                status: 409,
                menssage: "This cnpj is already registered.",
              });

            input.userId = userId;
            daos()
              .create(input)
              .then((store) => {
                httpResponseHelper.ok(res, store);
              })
              .catch((error) => next(error));
          });
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.editStore = async (req, res, next) => {
  const storeId = req.params.storeId;
  const owner = req.id;
  const data = req.body;
  try {
    const value = await inputHelpers.editSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findById(storeId, owner)
          .then((store) => {
            if (!store)
              return httpResponseHelper.notFound(res, {
                status: 404,
                menssage: "Store not found.",
              });

            daos()
              .findOne(input.cnpj || "")
              .then((find) => {
                if (find)
                  return httpResponseHelper.error(res, {
                    status: 409,
                    menssage: "This cnpj is already registered.",
                  });

                daos()
                  .update(input, storeId, owner)
                  .then((store) => {
                    httpResponseHelper.ok(res, store);
                  })
                  .catch((error) => next(error));
              });
          })
          .catch((error) => next(error));
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.me = async (req, res, next) => {
  const storeId = req.params.storeId;
  const owner = req.id;
  try {
    daos()
      .findById(storeId, owner)
      .then((store) => {
        if (!store)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Store not found.",
          });

        httpResponseHelper.ok(res, store);
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.all = async (req, res, next) => {
  const owner = req.id;
  try {
    daos()
      .findAll(owner)
      .then((store) => {
        if (!store)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Store not found.",
          });

        httpResponseHelper.ok(res, store);
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.deleteStore = async (req, res, next) => {
  const storeId = req.params.storeId;
  const owner = req.id;
  try {
    daos()
      .findById(storeId, owner)
      .then((store) => {
        if (!store)
          return httpResponseHelper.notFound(res, {
            status: 404,
            menssage: "Store not found.",
          });

        daos()
          .delete(storeId, owner)
          .then((store) => {
            if(!store)return httpResponseHelper.notFound(res, {
              status: 404,
              menssage: "Store not found.",
            });

            httpResponseHelper.ok(res, store);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};
