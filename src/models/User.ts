import { Model, DataTypes } from "sequelize";
import { Association, HasManyGetAssociationsMixin } from "sequelize";
import jwt from "jsonwebtoken";

import modelCommons, { tableCommons } from "@helpers/modelCommons";
import config from "@config/index";
import formatIsoString from "@helpers/formatIsoString";

class User extends Model {
  public id!: number;
  public email!: string;
  public name: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {};

  public getJWT = () => {
    const token = jwt.sign({ userId: this.id }, config.jwtSecret, {
      expiresIn: config.tokenExpiration,
    });
    return {
      token,
      expireAt: config.tokenExpirationInSecond,
      userId: this.id,
    };
  };

  public format = () => {
    return {
      ...this.toJSON(),
      password: undefined,
      createdAt: formatIsoString(this.createdAt),
      updatedAt: formatIsoString(this.updatedAt),
    };
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
      // beforeCreate: async (user) => {
      //   const hashedPassword = await bcrypt.hash(user.password, config.salt);
      //   user.password = hashedPassword;
      // },
    },
  }
);

export default User;
