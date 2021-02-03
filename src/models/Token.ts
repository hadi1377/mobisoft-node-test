import { Model, DataTypes } from "sequelize";

import modelCommons, { tableCommons } from "@helpers/modelCommons";

class Token extends Model {
  public id!: number;
  public userId!: number;
  public expireAt!: Date;
  public token!: string;
  public type!: string;
  public used!: boolean;
}

Token.init(
  {
    ...modelCommons,
    token: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    ...tableCommons("tokens", "Token"),
    timestamps: false,
  }
);

export default Token;
