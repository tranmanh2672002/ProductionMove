const Factories = require("../models/factoryModel");
const Products = require("../models/productModel");
const bcrypt = require("bcrypt");

const factoryCtrl = {
  getAllFactories: async (req, res) => {
    try {
      const factories = await Factories.find();
      if (factories) {
        res.json(factories);
      } else {
        res.json({ msg: "Not factories" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getFactoryById: async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Products.find({factory : id});
      const factory = await Factories.findOne({_id : id});

      if (products && factory) {
        res.json({products, factory});
      } else {
        res.json({ msg: "Not products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = factoryCtrl;
