const express = require("express");
const protect = require("../middleware/tokenMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    msg: "Protected Route Accesed ",
    user: req.user,
  });
});
module.exports = router;
