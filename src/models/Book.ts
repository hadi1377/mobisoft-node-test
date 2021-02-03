import { Model, DataTypes } from "sequelize";

import modelCommons, { tableCommons } from "@helpers/modelCommons";

class Book extends Model {
  public id: number;
  public userId: number;
  public title: string;
  public authors: string[];
  public categories: string[];
  public pageCount: number;
  public publishDate: string;
  public publisher: string;
  public createdAt: Date;
  public updatedAt: Date;
}

Book.init(
  {
    ...modelCommons,
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: true,
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    ...tableCommons("books", "Book"),
  }
);

export default Book;
