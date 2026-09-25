const TypeCategory = require("../models/TypeCategory");
const { isAdmin } = require("../middlewares/Auth");
const PriceCategory = require("../models/PriceCategory");

exports.createTypeCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (req.user.role !== "isAdmin") {
      return res.status(401).josn({
        success: false,
        message: "Authorization is failed due to Admin is not exist",
      });
    }
    const typeCategoryExist = await TypeCategory.findOne({ name: name });
    if (typeCategoryExist) {
      return res.status(400).josn({
        success: false,
        message: "This category already exist",
      });
    }
    const typeCategory = await TypeCategory.create({ name: name });
    res.status(201).json({
      success: true,
      message: "Type Category created successfully",
      data: typeCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTypeCategories = async (req, res) => {
  try {
    const categories = await TypeCategory.find({},{new:true});
    if (categories.length != 0) {
      return res.status(200).json({
        success: true,
        data: categories,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "categories are not available",
      });
    }
  } catch (error) {
    return res.stauts(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTypeCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const priceCategoriesUnderIt = await PriceCategory.find({
      typeCategory: categoryId,
    },{new:true});
    if (priceCategoriesUnderIt.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete - price categories exist under this type category",
      });
    }
    await TypeCategory.findByIdAndDelete({ categoryId });
    return res.status(200).json({
      success: true,
      message: "Type Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTypeCategory = async (req, res) => {
  try {
    const { categoryId, CategoryName } = req.body;
    const typeCategory = await TypeCategory.findByIdAndUpdate(
      categoryId,
      {
        name: CategoryName,
      },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Category Name updated successfully",
      data: typeCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
