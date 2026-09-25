const PriceCategory = require("../models/PriceCategory");
const TypeCategory = require("../models/TypeCategory");

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

exports.getPriceCategoriesType = async (req, res) => {
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

exports.deletePriceCategory = async(req,res) => {
  
}