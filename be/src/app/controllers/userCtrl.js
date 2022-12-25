const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const isEmail = (value) => {
  var regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  console.log(regex.test(value));
  return regex.test(value) ? true : false;
};

const validateName = (name) => {
  dname = name;
  ss = dname.split(" ");
  dname = "";
  for (i = 0; i < ss.length; i++)
    if (ss[i].length > 0) {
      if (dname.length > 0) dname = dname + " ";
      dname = dname + ss[i].substring(0, 1).toUpperCase();
      dname = dname + ss[i].substring(1).toLowerCase();
    }
  return dname;
};

const userCtrl = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!isEmail(username)) {
        return res.json({ msg: "Email ?? ", login: false });
      }
      console.log(req.body);
      const user = await Users.findOne({ username });

      if (!user) {
        return res.json({ msg: "Email not found", login: false });
      }
      // const isMatch = (password === user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ msg: "Password is not correct", login: false });
      }

      return res.json({
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

      if (!isEmail(email)) {
        return res.json({ msg: "Email ?? ", login: false });
      }
      // check email is already exist
      const user = await Users.findOne({ username: email });
      if (user) {
        return res.json({ msg: "Email registered", register: false });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const newUser = new Users({
        name: validateName(name),
        username: email,
        password: passwordHash,
        role,
        sdt,
        address,
      });

      // Save mongodb
      await newUser.save();

      return res.json({ msg: "Register successfully", register: true });
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
