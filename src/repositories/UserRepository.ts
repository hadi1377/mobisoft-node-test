import Book from "@models/Book";
import User from "@models/User";
import sequelize from "sequelize";
import { FindOptions } from "sequelize";

class UserRepository {
  public getUsersList = async () => {
    const users = await User.findAll(this.commonOptions());
    return {
      users: users.map((user) => user.format()),
    };
  };

  public getUserByID = async (userId: number | string) => {
    const user = await User.findByPk(userId, this.commonOptions());
    return {
      user: user.format(),
    };
  };

  protected commonOptions = (): FindOptions => ({
    attributes: {
      include: [
        [sequelize.fn("count", sequelize.col("books.id")), "booksCount"],
      ],
    },
    include: [
      {
        model: Book,
        as: "books",
        attributes: [],
      },
    ],
    group: ["User.id", "books.user_id"],
    order: ["created_at"],
  });
}

export default UserRepository;
