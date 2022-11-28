const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });

      if (!user) {
        return res.json({ msg: "Email not found", login: false });
      }
      // const isMatch = (password === user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.json({ msg: "Password is not correct", login: false });
      }

      res.json({
        msg: "Login is correct",
        login: true,
        id: user._id,
        username: user.name,
        role: user.role,
        email: user.username,
        idPage: user.idPage,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, role, sdt, address } = req.body;

      // check email is already exist
      const user = await Users.findOne({ username: email });
      if (user) {
        return res.json({ msg: "Email registered", register: false });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const newUser = new Users({
        name,
        username: email,
        password: passwordHash,
        role,
        sdt,
        address,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: "Register successfully", register: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const user = await Users.findOne({ _id: id });
      if (!user) return res.json({ msg: "User not found" });
      await Users.findByIdAndDelete(id);
      res.json({ msg: "User deleted", delete: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.body;

      const user = await Users.findOne({ _id: id });
      if (!user) return res.status(400).json({ msg: "User not found" });

      await Users.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "User updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getUserAdmin: async (req, res) => {
    try {
      const user = await Users.find({ role: "admin" });
      if (user) {
        res.json(user);
      } else {
        res.json({ msg: "Not user admin" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserAgency: async (req, res) => {
    try {
      const user = await Users.find({ role: "agency" });
      if (user) {
        res.json(user);
      } else {
        res.json({ msg: "Not user admin" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserGuarantee: async (req, res) => {
    try {
      const user = await Users.find({ role: "guarantee" });
      if (user) {
        res.json(user);
      } else {
        res.json({ msg: "Not user admin" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserFactory: async (req, res) => {
    try {
      const user = await Users.find({ role: "factory" });
      if (user) {
        res.json(user);
      } else {
        res.json({ msg: "Not user admin" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
