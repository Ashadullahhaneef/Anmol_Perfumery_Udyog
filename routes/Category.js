const express = require("express");
const router = express.Router();

const {
  createTypeCategory,
  getAllTypeCategories,
  deleteTypeCategory,
  updateTypeCategory,
} = require("../controllers/Category");
const {
  createPriceCategory,
  updatePriceCategory,
  deletePriceCategory,
  getPriceCategoriesByType,
} = require("../controllers/PriceCategory");

const { auth, isAdmin } = require("../middlewares/Auth");

//TypeCategory
router.post("/type", auth, isAdmin, createTypeCategory);
router.get("/type", getAllTypeCategories);
router.delete("/type/categroryId", auth, isAdmin, deleteTypeCategory);
router.put("/type/:categoryId", auth, isAdmin, updateTypeCategory);

//PriceCategory
router.post("/price", auth, isAdmin, createPriceCategory);
router.delete("/price/:typeCategoryId", auth, isAdmin, deletePriceCategory);
router.get("/price/:typeCategoryId", getPriceCategoriesByType);
router.put("/price/priceCategoryId", auth, isAdmin, updatePriceCategory);

module.exports = router;