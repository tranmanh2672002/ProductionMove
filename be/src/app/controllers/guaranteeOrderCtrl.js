const GuaranteeOrders = require("../models/orderGuaranteeModel");
const Orders = require("../models/orderModel");

const guaranteeOrderCtrl = {
  createGuaranteeOrder: async (req, res) => {
    try {
      const { idOrder, error, idAgency, status } = req.body;
      // console.log(idOrder + " " + error + " " + idAgency + " " + status);
      const order = await Orders.findOne({ _id: idOrder });
      if (!order) {
        return res.json({
          msg: "Failure Create new Guarantee Order",
          create: true,
        });
      }
      await Orders.findByIdAndUpdate(
        idOrder,
        { status: "guarantee" },
        { new: true }
      );
      const newGuaranteeOrder = new GuaranteeOrders({
        idOrder: idOrder,
        error: error,
        idAgency: idAgency,
        status: status,
      });
      await newGuaranteeOrder.save();
      res.json({ msg: "Create new Guarantee Order", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNotGuaranteeOrder: async (req, res) => {
    try {
      const idGuaranteeOrder = req.params.id;
      console.log(idGuaranteeOrder);
      const guaranteeOrder = await GuaranteeOrders.findOne({
        _id: idGuaranteeOrder,
      });
      const order = await Orders.findOne({ _id: guaranteeOrder.idOrder });
      if (!order) {
        return res.json({
          msg: "Failure update new Guarantee Order",
          update: true,
        });
      }
      if (!guaranteeOrder) {
        return res.json({
          msg: "Failure update new Guarantee Order",
          update: true,
        });
      }
      await Orders.findByIdAndUpdate(
        order._id,
        { status: "not guarantee" },
        { new: true }
      );
      await GuaranteeOrders.findByIdAndDelete(idGuaranteeOrder);
      res.json({ msg: "Update new Guarantee Order", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getGuaranteeOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const guaranteeOrders = await GuaranteeOrders.find({
        idAgency: id,
        status: "agency",
      });

      if (guaranteeOrders) {
        let productGuarantees = await Promise.all(
          guaranteeOrders.map(async (guaranteeOrder) => {
            return await Orders.findOne({ _id: guaranteeOrder.idOrder });
          })
        );
        res.json({
          productGuarantees: productGuarantees,
          guaranteeOrders: guaranteeOrders,
        });
      } else {
        res.json({ msg: "Not guaranteeOrders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = guaranteeOrderCtrl;
