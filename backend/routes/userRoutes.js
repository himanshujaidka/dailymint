const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", getMe);

module.exports = router;
