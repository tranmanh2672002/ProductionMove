const Products = require("../models/productModel.js");

const productCtrl = {

  create: async (req, res) => {
    try {
      const { code, name, description, image, price } = req.body;

      const product = await Products.findOne({ code: code });
      if (product) {
        return res.json({ msg: "Code product registered", create: false });
      }
      const newProduct = new Products({
        code,
        name,
        description,
        image,
        price,
        agency: [],
        guarantee: [],
        factory: [],

      });

      // Save mongodb
      await newProduct.save();
      res.json({ msg: "Create product successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.body;

      const product = await Products.findOne({ _id: id });
      if (!product) {
        return res.status(400).json({ msg: "Product not found" });
      }
      await Products.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Product updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const product = await Products.findOne({ _id: id });
      if (!product) return res.json({ msg: "Product not found" });
      await Products.findByIdAndDelete(id);
      res.json({ msg: "User deleted", delete: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Products.find();
      if (products) {
        res.json(products);
      } else {
        res.json({ msg: "Not products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProductsFactory: async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Products.find({factory: id});
      if (products) {
        res.json(products);
      } else {
        res.json({ msg: "Not products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = productCtrl;
