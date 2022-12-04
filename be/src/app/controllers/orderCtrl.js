const Orders = require("../models/orderModel");
const Agencies = require("../models/agencyModel");
const Products = require("../models/productModel");
const Customers = require("../models/customerModel");

const orderCtrl = {
  getOderFromIdAgency: async (req, res) => {
    try {
      const id = req.params.id;
      const orders = await Orders.find({ idAgency: id });
      const agency = await Agencies.findOne({ _id: id });
      const products = await Products.find();
      if (orders && agency) {
        res.json({
          orders: orders,
          nameAgency: agency.name,
          products: products,
        });
      } else {
        res.json({ msg: "Not orders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createOder: async (req, res) => {
    try {
      const {
        idAgency,
        nameAgency,
        nameCustomer,
        sdt,
        address,
        price,
        idProduct,
      } = req.body;
      const newCustomer = new Customers({
        name: nameCustomer,
        sdt: sdt,
        address: address,
      })

      await newCustomer.save();

      const product = await Products.findOne({_id: idProduct})
      const newOrder = new Orders({
        idAgency: idAgency,
        nameAgency: nameAgency,
        idCustomer: newCustomer._id,
        idProduct: idProduct,
        nameProduct: product.name,
        price: price,
        status: 'not guarantee',
      })
      newOrder.save();
      res.json({create: true, msg: 'Create order'});

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderCtrl;
