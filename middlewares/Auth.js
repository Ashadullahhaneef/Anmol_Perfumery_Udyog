const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", ""));
    if (!token) {
      return res.status(401).josn({
        success: false,
        message: "Token Missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token didnot decode",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (userDetails.role !== "admin") {
      return res.status().json({
        success: false,
        message: "This is protected route for admin",
      });
    }
    next();
  } catch (error) {
    res.status().josn({
      success: true,
      message: "user role cannot be verified",
    });
  }
};

exports.isCustomer = async (req, res, next) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (userDetails.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for customer",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role cannot be verified",
    });
  }
};
