const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/Auth");

const {
  createProduct,
  getProductByPriceCategory,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/Product");

router.post("/", auth, isAdmin, createProduct);
router.delete("/:priceCategoryId", deleteProduct);
router.put("/:productId", auth, isAdmin, updateProduct);
router.get(
  "/price-category/:priceCategoryId",
  auth,
  isAdmin,
  getProductByPriceCategory,
);
router.get("/:productId", auth, isAdmin, getProductDetails);

module.exports = router;
