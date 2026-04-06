const User = require("../models/user.model");

const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.update(data);

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
};