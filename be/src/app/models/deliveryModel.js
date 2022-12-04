const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema (
  {
    from: {
      type: String,
    },
    nameFrom: {
      type: String,
    },
    to: {
      type: String,
    },
    nameTo: {
      type: String,
    },
    nameProduct: {
      type: String,
    },
    idProduct: {
      type: String,
    },
    idGuaranteeOrder: {
      type: String,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: 'Đang giao hàng'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deliveries", deliverySchema);
