const mongoose = require("mongoose");

const orderModel = new mongoose.Schema (
  {
    idAgency: {
      type: String,
    },
    nameAgency: {
      type: String,
    },
    idCustomer: {
      type: String,
    },
    idProduct: {
      type: String,
    },
    nameProduct: {
      type: String,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderModel);
