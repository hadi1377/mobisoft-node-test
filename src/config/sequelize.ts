import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "blockchain_labb",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
      dialect: <any>process.env.DB_DRIVER || "postgres",
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
  }
);

export default sequelize;
