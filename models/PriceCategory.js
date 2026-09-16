const mongoose = require("mongoose");

const priceCategorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    typeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PriceCategory", priceCategorySchema);
