const jwtConfig = require("../config/jwt");
const jwt = require("jsonwebtoken");
const HttpResponseHelper = require("../helpers/httpResponseHelper");
const httpResponseHelper = require("../helpers/httpResponseHelper");
const daos = require("../daos/shopkeeperDaos");

exports.verifyJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return HttpResponseHelper.error(res, {
      status: 401,
      auth: false,
      message: "No token provided.",
    });

  jwt.verify(token, jwtConfig.secret, function (err, decoded) {
    if (err)
      return HttpResponseHelper.error(res, {
        status: 401,
        auth: false,
        message: "Failed to authenticate token.",
      });
    try {
    daos()
        .findById(decoded.id)
        .then((find) => {
          if (!find)
            return httpResponseHelper.error(res, {
              status: 409,
              menssage: "User not found.",
            });


         req.id = find.dataValues.userId;
          next();
        })
        .catch((error) => httpResponseHelper.error(res, error));
    } catch (err) {
      if (err) return httpResponseHelper.error(res, err);
    }
  });
};
