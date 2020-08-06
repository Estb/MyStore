const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt");
const jwt = require("jsonwebtoken");
const inputHelpers = require("../helpers/inputShopkeeperHelper");
const httpResponseHelper = require("../helpers/httpResponseHelper");
const daos = require("../daos/shopkeeperDaos");

exports.newShopkeeper = async (req, res, next) => {
  const data = req.body;
  try {
    const value = await inputHelpers.newSchema
      .validateAsync(data)
      .then((input) => {
       daos()
          .findOne(input.email)
          .then((user) => {
            if (user) {
              return httpResponseHelper.error(res, {
                status: 409,
                menssage: "This email is already registered.",
              });
            } else {
            bcrypt.hash(input.password, 10).then((hash) => {
              input.password = hash;
              daos()
                .create(input)
                .then((resp) => {
                  httpResponseHelper.created(res, resp);
                })
                .catch((error) => next(error));
            });
          }
          })
          .catch((error) => next(error));
      })
      .catch((error) => httpResponseHelper.error(res, error));
  } catch (error) {
    if (error) return httpResponseHelper.error(res, err);
  }
};

exports.loginShopkeeper = async (req, res, next) => {
  const data = req.body;
  try {
    const value = await inputHelpers.loginSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findOne(input.email)
          .then((usr) => {
            if (!usr)
              return httpResponseHelper.error(res, {
                status: 401,
                message: "Email and/or Pass dont match",
              });

            const password = usr.dataValues.password;
            bcrypt.compare(input.password, password, (err, result) => {
              if (err)
                return httpResponseHelper.error(res, {
                  status: 401,
                  message: "User and/or Pass dont match",
                });
              if (result == false)
                return httpResponseHelper.error(res, {
                  status: 401,
                  message: "User and/or Pass dont match",
                });

              const id = usr.userId;
              const token = jwt.sign({ id }, jwtConfig.secret, {
                expiresIn: 3000, // expires in 50min
              });
              usr = [usr];
              usr.push({ token: token });
              return httpResponseHelper.ok(res, usr);
            });
          })
          .catch((err) => next(err));
      })
      .catch((err) => httpResponseHelper.error(res, err));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.editShopkeeper = async (req, res, next) => {
  const userId = req.id;
  const data = req.body;
  try {
    const value = await inputHelpers.editSchema
      .validateAsync(data)
      .then((input) => {
        daos()
          .findById(userId)
          .then((user) => {
            if (!user) return httpResponseHelper.notFound(res);

            let pr = {};
            if (input.password) {
            bcrypt.hash(input.password, 10)
            .then((hash) => {
                input.password = hash;
              daos()
                .update(input, userId)
                .then((edit) => {
                  httpResponseHelper.ok(res, edit);
                })
              })
                .catch((error) => next(error));
            } else {
              daos()
                .update(input, userId)
                .then((edit) => {
                  httpResponseHelper.ok(res, edit);
                })
                .catch((error) => next(error));
            }
          })
          .catch((error) => next(error));
      })
      .catch((error) => httpResponseHelper.notFound(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};

exports.deleteShopkeeper = async (req, res, next) => {
  const id = req.id;
  try {
    daos()
      .findById(id)
      .then((b) => {
        if (!b) return httpResponseHelper.notFound(res);

        daos()
          .delete(id)
          .then((c) => {
            httpResponseHelper.ok(res, c);
          })
          .catch((error) => httpResponseHelper.error(res, error));
      })
      .catch((error) => next(error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};


exports.me = async (req, res, next) => {
  const id = req.id;
  try {
    daos()
      .findById(id)
      .then((b) => {
        if (!b) return httpResponseHelper.notFound(res);

            httpResponseHelper.ok(res, b);
          })
          .catch((error) => httpResponseHelper.error(res, error));
  } catch (err) {
    if (err) return httpResponseHelper.error(res, err);
  }
};