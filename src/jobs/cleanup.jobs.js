const Record = require("../models/record.model");

const cleanupSoftDeletedRecords = async () => {
  try {
    const deleted = await Record.destroy({
      where: {},
      force: true, // permanently delete
    });

    console.log(`🧹 Cleaned ${deleted} records`);
  } catch (error) {
    console.error("Cleanup job failed:", error.message);
  }
};

module.exports = cleanupSoftDeletedRecords;