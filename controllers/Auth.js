const bcrypt = require("bcrypt");
const User = require("../models/User");
const jw5 = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
        succcess: false,
        message: "All fields are required",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        succcess: false,
        message: "password and confirmPassword do not matched",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please sign up first",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
      );
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login Successful",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failure, Please Try Again",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};
