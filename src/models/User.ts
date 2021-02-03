import { Model, DataTypes } from "sequelize";
import { Association, HasManyGetAssociationsMixin } from "sequelize";
import bcrypt from "bcryptjs";

import modelCommons, { tableCommons } from "@helpers/modelCommons";
import Token from "@models/Token";
import config from "@config/index";

class User extends Model {
  public id!: number;
  public email!: string;
  public name: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTokens!: HasManyGetAssociationsMixin<Token>;

  public readonly tokens?: Token[];

  public static associations: {
    tokens: Association<User, Token>;
  };
}
User.init(
  {
    ...modelCommons,
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    ...tableCommons("users", "User"),
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, config.salt);
        user.password = hashedPassword;
      },
    },
  }
);

export default User;
