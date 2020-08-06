const express = require('express');
const router = express.Router()
const shopkeeperController = require("../controllers/shopkeeperController")
const middleware = require("../middleware/verifyToken")


router.get(
  "/shopkeeper",
  middleware.verifyJWT,
   shopkeeperController.me 
   )

router.post(
  "/shopkeeper",
   shopkeeperController.newShopkeeper 
   )

router.post(
  "/shopkeeper/login",
   shopkeeperController.loginShopkeeper 
   )

router.put(
  "/shopkeeper",
   middleware.verifyJWT,
    shopkeeperController.editShopkeeper
     )

router.delete(
  "/shopkeeper",
   middleware.verifyJWT,
    shopkeeperController.deleteShopkeeper 
    )


module.exports = router