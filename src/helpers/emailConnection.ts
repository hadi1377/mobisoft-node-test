import nodemailer from "nodemailer";

import config from "../config";

const emailConnection = () => {
  const transport = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass,
    },
  });
  return transport;
};

export default emailConnection;
