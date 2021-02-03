import {
  Model,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";
import {
  Association,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import bcrypt from "bcryptjs";

import modelCommons, { tableCommons } from "@helpers/modelCommons";
import Token from "@models/Token";
import config from "@config/index";

class User extends Model {
  public id!: number;
  public email!: string;
  public name: string;
  public password!: string;
  public confirmedAt: Date;
  public roleId!: number;
  public twitter?: string;
  public instagram?: string;
  public website?: string;
  public biography?: string;
  public profileImage?: string;
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
    roleId: {
      type: DataTypes.INTEGER,
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
    confirmedAt: {
      type: DataTypes.DATE(),
      defaultValue: null,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
