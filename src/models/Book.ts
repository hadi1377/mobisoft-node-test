import { Model, DataTypes } from "sequelize";
import path from "path";

import modelCommons, { tableCommons } from "@helpers/modelCommons";
import formatIsoString from "@helpers/formatIsoString";
import User from "./User";

class Book extends Model {
  public id: number;
  public userId: number;
  public title: string;
  public description: string;
  public authors: string[];
  public categories: string[];
  public pageCount: number;
  public publishDate: string;
  public publisher: string;
  public imagePath?: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  public user: User;

  public format = () => {
    return {
      ...this.toJSON(),
      createdAt: formatIsoString(this.createdAt),
      updatedAt: formatIsoString(this.updatedAt),
      authors: this.authors.join(","),
      categories: this.categories ? this.categories.join(",") : "",
      isFromGoogle: false,
      externalLink: null,
      user: this.user ? this.user.format() : undefined,
      imagePath: this.imagePath
        ? `${process.env.APP_URL}/uploads/books/${this.id}${path.extname(
            this.imagePath
          )}`
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
    };
  };
}

Book.init(
  {
    ...modelCommons,
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    publishDate: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    imagePath: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    ...tableCommons("books", "Book"),
  }
);

export default Book;
