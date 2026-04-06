const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Record = sequelize.define(
  "Record",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Amount must be positive",
        },
      },
    },

    type: {
      type: DataTypes.ENUM("INCOME", "EXPENSE"),
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    note: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "records",
    timestamps: true,
    paranoid: true, // soft delete
    indexes: [
      { fields: ["type"] },
      { fields: ["category"] },
      { fields: ["date"] },
    ],
  }
);

module.exports = Record;