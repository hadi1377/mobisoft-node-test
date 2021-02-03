import sequelize from "@config/sequelize";
import User from "@models/User";
import Token from "@models/Token";

// User and token
User.hasMany(Token, {
  foreignKey: "userId",
  as: "tokens",
  constraints: false,
});
Token.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "cascade",
  onUpdate: "cascade",
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
