const express = require('express');
const router = express.Router()
const stock = require('../controllers/stockController') 
const middleware = require("../middleware/verifyToken")
const middleware2 = require("../middleware/verifyStoreOwner")

router.get(
  "/store/:storeId/products/:sku",
  middleware.verifyJWT,
  middleware2.verifyStoreOwner,
  stock.oneProduct
)


router.get(
  "/store/:storeId/products",
  middleware.verifyJWT,
  middleware2.verifyStoreOwner,
  stock.allProduct
)


router.post(
  "/store/:storeId/products",
  middleware.verifyJWT,
  middleware2.verifyStoreOwner,
  stock.newProduct
)


router.put(
  "/store/:storeId/products/:sku",
  middleware.verifyJWT,
  middleware2.verifyStoreOwner,
  stock.editProduct
)


router.delete(
  "/store/:storeId/products/:sku",
  middleware.verifyJWT,
  middleware2.verifyStoreOwner,
  stock.deleteProduct
)

module.exports = router