const express = require("express");
const router = express.router();

const{login,signup,logout} = require("../controllers/Auth");
const {auth,isAdmin,isCustomer} = require("../middlewares/Auth")


router.post("/login",login);
router.post("/signup",signup);
router.get("/logout",auth,logout)

module.exports = router;