const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");

router.route("/submit").post(userController.submit);
router.route("/user/:name").get(userController.getUser);

module.exports = router;
