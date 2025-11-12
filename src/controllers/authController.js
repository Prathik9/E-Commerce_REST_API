const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models");
require("dotenv").config();

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email in use" });
    // const user = await User.create({ email, password, role: role === 'admin' ? 'admin' : 'customer' });
    const user = await User.create({ email, password, role: "customer" });

    // create cart automatically
    await Cart.create({ userId: user.id });
    return res.status(201).json({ token: signToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const valid = await user.validPassword(password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });
    return res.json({ token: signToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
