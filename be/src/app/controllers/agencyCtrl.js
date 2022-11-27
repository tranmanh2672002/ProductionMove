const Agencies = require("../models/agencyModel");
const Products = require("../models/productModel");
const bcrypt = require("bcrypt");

const agencyCtrl = {
  getAllAgencies: async (req, res) => {
    try {
      const agencies = await Agencies.find();
      if (agencies) {
        res.json(agencies);
      } else {
        res.json({ msg: "Not agencies" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAgencyById: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const products = await Products.find({agency : id});
      const agency = await Agencies.findOne({_id : id});

      if (products && agency) {
        res.json({products, agency});
      } else {
        res.json({ msg: "Not agency" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = agencyCtrl;
