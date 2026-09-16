const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    fragranceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    perDozenRate: {
      type: Number,
      required: true,
    },
    percentageOff: {
      type: Number,
      default: 0,
    },
    designImage: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      default: 0,
    },
    priceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PriceCategory",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
