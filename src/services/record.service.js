const Record = require("../models/record.model");
const APIFeatures = require("../utils/apiFeature");

const createRecord = async (data, userId) => {
  return await Record.create({
    ...data,
    userId,
  });
};

const getRecords = async (queryParams) => {
  let query = Record.findAll();

  const features = new APIFeatures(query, queryParams)
    .filter()
    .search(["category", "note"])
    .sort()
    .paginate();

  return await features.query;
};

const updateRecord = async (id, data) => {
  const record = await Record.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  await record.update(data);

  return record;
};

const deleteRecord = async (id) => {
  const record = await Record.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  await record.destroy(); // soft delete (paranoid)

  return true;
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};