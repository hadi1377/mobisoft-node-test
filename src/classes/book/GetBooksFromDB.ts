import Book from "@models/Book";
import User from "@models/User";
import sequelize from "sequelize";
import { Op } from "sequelize";

class GetBooksFromDB {
  protected queryParams: Book.SearchQueryParams;
  protected whereConditions: any;

  constructor(queryParams: Book.SearchQueryParams) {
    this.queryParams = queryParams;
  }

  public exec = async () => {
    this.setWhereConditions();
    return await this.getData();
  };

  protected setWhereConditions = () => {
    if (this.queryParams.title) {
      this.whereConditions = {
        ...this.whereConditions,
        title: sequelize.where(
          sequelize.fn("lower", sequelize.col("Book.title")),
          "like",
          `%${this.queryParams.title}%`
        ),
      };
    }
    if (this.queryParams.author) {
      this.whereConditions = {
        ...this.whereConditions,
        authors: {
          [Op.contains]: [this.queryParams.author],
        },
      };
    }
    if (this.queryParams.publisher) {
      this.whereConditions = {
        ...this.whereConditions,
        publisher: sequelize.where(
          sequelize.fn("lower", sequelize.col("Book.publisher")),
          "like",
          `%${this.queryParams.publisher}%`
        ),
      };
    }
  };

  protected getData = async () => {
    const data = await Book.findAll({
      where: this.whereConditions,
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    return GetBooksFromDB.transformData(data);
  };

  protected static transformData = (books: Book[]) => {
    return books.map((book) => {
      return book.format();
    });
  };
}

export default GetBooksFromDB;
