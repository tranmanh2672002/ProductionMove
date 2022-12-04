const mongoose = require("mongoose");

const guaranteeSchema = new mongoose.Schema (
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    account: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guarantees", guaranteeSchema);
