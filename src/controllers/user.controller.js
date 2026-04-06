const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});