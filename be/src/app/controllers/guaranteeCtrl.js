const Guarantees = require("../models/guaranteeModel");

const guaranteeCtrl = {
  getAllGuarantees: async (req, res) => {
    try {
      const guarantees = await Guarantees.find();
      if (guarantees) {
        res.json(guarantees);
      } else {
        res.json({ msg: "Not agencies" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getGuaranteeById: async (req, res) => {
    try {
      const id = req.params.id;
      const guarantee = await Guarantees.findOne({_id : id});

      if ( guarantee) {
        res.json(guarantee);
      } else {
        res.json({ msg: "Not guarantee" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = guaranteeCtrl;
