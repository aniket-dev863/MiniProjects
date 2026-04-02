const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log(`Register user Hit`);
    const { name, email, password } = req.body;
    console.log("Request body:", req.body);
    console.log(`Searching user with email :${email}`);
    const userExists = await User.findOne({ email });
    /**
     * User.findOne({}) also is a Promise .
     */
    if (userExists) {
      return res.status(400).json({ Message: "This user Alredy Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    /**
     * bcrypt.hash(password,10) is also a promise .
     * bcrypt.compare is also a promise here .
     */
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    /**
     *  User.create({}) is a promise .
     */
    res.status(201).json({
      message: "User Registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      Error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ Message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    /**
     * forma to create a token :
     * {
     *      Payload ;
     *      JWT_SECRET;
     *      Options ;
     *
     * }
     */
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error Occured During Login",
      Error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
