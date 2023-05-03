const express = require("express");
const auth = require("../middleware/auth");

const {
    registerUser, loginUser, logOut, rememberedLogin,
} = require("./../controllers/authController");

const router = express.Router();


router.route("/register").post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/remembered-login').post(auth, rememberedLogin);


module.exports = router;