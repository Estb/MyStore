const express = require('express');
const router = express.Router()
const store = require('../controllers/storeController') 
const middleware = require("../middleware/verifyToken");
const  middleware2  = require('../middleware/verifyStoreOwner');


router.get(
  "/store/:storeId",
  middleware.verifyJWT,
  store.me 
)

router.get(
  "/store",
  middleware.verifyJWT,
  store.all 
)

     
router.post(
  "/store",
  middleware.verifyJWT,
   store.newStore 
)


router.put(
  "/store/:storeId",
  middleware.verifyJWT,
  store.editStore
)


router.delete(
  "/store/:storeId",
  middleware.verifyJWT,
  store.deleteStore 
)

module.exports = router