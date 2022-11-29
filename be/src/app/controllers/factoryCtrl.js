const Factories = require("../models/factoryModel");
const Products = require("../models/productModel");
const Agencies = require("../models/agencyModel");
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
      const products = await Products.find({ factory: id });
      const factory = await Factories.findOne({ _id: id });
      const agencies = await Agencies.find();

      if (products && factory && agencies) {
        res.json({ products, factory, agencies});
      } else {
        res.json({ msg: "Not products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateAmount: async (req, res) => {
    try {
      const { id, storage } = req.body;

      const factory = await Factories.findOne({ _id: id });
      if (!factory) {
        return res.status(400).json({ msg: "factory not found" });
      }

      await Factories.findByIdAndUpdate(
        id,
        { storage:  storage},
        { new: true }
      );

      res.json({ msg: "Factory updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = factoryCtrl;
