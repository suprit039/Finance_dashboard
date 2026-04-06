const asyncHandler = require("../utils/asyncHandler");
const recordService = require("../services/record.service");

exports.createRecord = asyncHandler(async (req, res) => {
  const record = await recordService.createRecord(
    req.body,
    req.user.id
  );

  res.status(201).json({
    success: true,
    message: "Record created",
    data: record,
  });
});

exports.getRecords = asyncHandler(async (req, res) => {
  const records = await recordService.getRecords(req.query);

  res.json({
    success: true,
    data: records,
  });
});

exports.updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Record updated",
    data: record,
  });
});

exports.deleteRecord = asyncHandler(async (req, res) => {
  await recordService.deleteRecord(req.params.id);

  res.json({
    success: true,
    message: "Record deleted",
  });
});