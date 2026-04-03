const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const nameExists = await User.findOne({ email });
    if (nameExists) {
      res.status(400).json({
        msg: "User Already Exist's",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      Msg: "New User Registered",
      User: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(401).json({
      msg: "Some Error Occured ",
      Error: {
        msg: error.message,
      },
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(400).json({ msg: "User Doesn't Exists , Please Register " });
    }
    const matchPassword = await bcrypt.compare(password, userExists.password);
    if (!matchPassword) {
      res.status(400).json({ msg: "Password is incorrect , please Try Again" });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).json({
      msg: "Login Successful",
      Token: token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Some Error Occured",
      Error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
