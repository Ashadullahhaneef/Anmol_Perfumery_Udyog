const PriceCategory = require("../models/PriceCategory");
const TypeCategory = require("../models/TypeCategory");
const Product = require("../models/Product");

exports.createPriceCategory = async (req, res) => {
  const { label, value, typeCategoryId } = req.body;

  if (!label || !value || !typeCategoryId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const parentCategory = await TypeCategory.findById({ id: typeCategoryId });
  if (!parentCategory) {
    return res.status(404).json({
      success: false,
      message: "Type Category doesnot exist",
    });
  }
  const priceCategory = await PriceCategory.create(
    {
      label,
      value,
      typeCategory: typeCategoryId,
    },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Price Category Created Successfully",
    data: priceCategory,
  });
};

exports.getPriceCategoriesByType = async (req, res) => {
  try {
    const { typeCategoryId } = req.params;
    const priceCategories = await PriceCategory.find(
      { typeCategory: typeCategoryId },
      { new: true },
    );
    if (priceCategories.length == 0) {
      return res.status(400).json({
        success: false,
        message: "price category isme hai hi nahi",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "successfully find all pricecategory",
        data: priceCategories,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePriceCategory = async (req, res) => {
  try {
    const { priceCategoryId } = req.params;
    const productUnderIt = await Product.find({
      priceCategory: priceCategoryId,
    });
    if (productUnderIt.length > 0) {
      return res.status(400).json({
        success: false,
        message: "cannot delete, product exist under this price category",
      });
    }
    await PriceCategory.findByIdAndDelete(priceCategoryId);
    return res.status(200).json({
      success: true,
      message: "Price category deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePriceCategory = async (req, res) => {
  const { priceCategoryId } = req.params;
  const { label, value } = req.body;
  const updatedPriceCategory = await PriceCategory.findByIdAndUpdate(
    priceCategoryId,
    { label: label, value: value },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Price Category has updated successfully",
    data: updatedPriceCategory,
  });
};
