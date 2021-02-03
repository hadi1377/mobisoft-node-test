import sequelize from "@config/sequelize";
import User from "@models/User";
import Book from "./Book";

User.hasMany(Book, {
  as: "books",
  foreignKey: "userId",
});
Book.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

sequelize
  .authenticate({
    logging: false,
  })
  .then((value) => {
    console.log("Connected to database successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

export default sequelize;
