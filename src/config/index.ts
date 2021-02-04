import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;
export default {
  url: `http://127.0.0.1:8000`,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  allowedOrigins: [
    `http://localhost:${port}`,
    "http://yourapp.com",
    "http://localhost:4020",
    `http://127.0.0.1:${port}`,
    `http://127.0.0.1:3000`,
    `http://localhost:3000`,
    `http://shopapi.sedevs.com`,
    `https://shopapi.sedevs.com`,
  ],
  salt: parseInt(process.env.PASS_ENCRYPT_SALT),
  tokenExpiration: "365d",
  tokenExpirationInSecond: 60 * 60 * 24 * 10 * 365,
  email: {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0ac1bbccfaef6f",
      pass: "a170315baf3c22",
    },
  },
  emails: {
    defaultConfirmEmail: `info@example.com`,
    defaultForgotEmail: `info@example.com`,
  },
  disk: {
    maxSize: 1024 * 1024 * 8,
  },
  googleApiKey: process.env.GOOGLE_API_KEY || "AIzaSyD2TzKVnBKbMs92hop1JAFCfFnGcpDbyRA",
};
