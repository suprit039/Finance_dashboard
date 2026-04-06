const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};