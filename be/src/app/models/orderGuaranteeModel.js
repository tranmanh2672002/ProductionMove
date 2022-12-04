const mongoose = require("mongoose");

const orderGuaranteeModel = new mongoose.Schema (
  {
    idOrder: {
      type: String,
    },   
    error: {
      type: String,
    },
    idAgency: {
      type: String,
      default: '',
    },
    idGuarantee: {
      type: String,
      default: '',
    },
    idFactory: {
      type: String,
      default: '',
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderGuarantees", orderGuaranteeModel);
