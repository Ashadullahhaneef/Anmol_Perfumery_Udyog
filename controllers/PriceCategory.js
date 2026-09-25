const PriceCategory = require("../models/PriceCategory")
const TypeCategory = require("../models/TypeCategory")


exports.createPriceCategory = async(req,res) => {
  const {label,value,typeCategoryId} = req.body;

  if(!label || !value || !typeCategoryId) {
    return res.status(400).json({
      success:false,
      message:"All fields are required"
    })
  }
  const parentCategory = await TypeCategory.findById({typeCategoryId});
  if(!parentCategory)
    {
    return res.status(404).json({
      success:false,
      message:"Type Category doesnot exist"
    })
}}