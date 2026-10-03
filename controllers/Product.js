const Product = require("../models/Product");
const PriceCategory = require("../models/PriceCategory");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      fragranceName,
      description,
      designImage,
      perDozenRate,
      percentageOff,
      stock,
      priceCategoryId,
    } = req.body;
    if (
      !title ||
      !fragranceName ||
      !description ||
      !designImage ||
      !perDozenRate ||
      !percentageOff ||
      !stock ||
      !priceCategoryId
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const parentPriceCategory = await PriceCategory.findById(priceCategoryId);
    if (!parentPriceCategory) {
      return res.status(404).json({
        success: false,
        message: "Price Category Not Found",
      });
    }
    const product = await Product.create({
      title,
      fragranceName,
      description,
      designImage,
      perDozenRate,
      percentageOff,
      stock,
      priceCategory: priceCategoryId,
    });
    return res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductByPriceCategory = async (req, res) => {
  try {
    const { priceCategoryId } = req.params;
    const products = await Product.find({
      priceCategory: priceCategoryId,
    }).populate({
      path: "priceCategory",
      populate: { path: "typeCategory" },
    });
    if (products.length < 1) {
      return res.status(400).json({
        success: false,
        message: "iss price category me koi product nhi mila hai",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All Proudcts Fetched according to price category",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: "priceCategory",
      populate: { path: "typeCategory" },
    });
    if (!product) {
      return res.status(401).json({
        success: false,
        message: "product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "product doestnot fetching ,please try again",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).josn({
      success: true,
      message: "Proudct Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      sucess: true,
      message: "Prouduct Deleted Successfullly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
