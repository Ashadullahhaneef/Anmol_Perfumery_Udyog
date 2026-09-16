const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  dozenQty: {
    type: Number,
    required: true,
  },
  priceAtOrder: {
    type: Number,
    requried: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      fullName: String,
      phone: String,
      pincode: String,
      street: String,
      city: String,
      state: String,
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["placed", "packed", "shipped", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
