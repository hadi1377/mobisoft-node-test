import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const modelCommons = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
};

export const tableCommons = (tableName: string, modelName: string) => {
  return {
    sequelize,
    underscored: true,
    tableName,
    modelName,
  };
};

export default modelCommons;
