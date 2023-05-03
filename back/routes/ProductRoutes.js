const express = require("express");
const auth = require("../middleware/auth");

const {
    newProduct
} = require("./../controllers/productController");

const router = express.Router();


router.route("/").post(auth, newProduct);


module.exports = router;