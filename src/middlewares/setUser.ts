import { RequestHandler } from "express";
import JWT from "jsonwebtoken";

import config from "@config/index";
import User from "@models/User";

const setUser: RequestHandler = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      // This will remove 'Bearer' section
      const jwtToken = req.headers.authorization.split(" ")[1];
      const verifiedToken = JWT.verify(jwtToken, config.jwtSecret);
      if (verifiedToken) {
        const decodedToken: any = JWT.decode(jwtToken, { complete: true });
        const foundUser: any = await User.findByPk(decodedToken.payload.userId);
        req.user = foundUser;
        req.isAuth = true;
      } else {
        req.isAuth = false;
        req.role = "guest";
      }
    } else {
      req.isAuth = false;
      req.role = "guest";
    }
  } catch (error) {
    req.isAuth = false;
    req.role = "guest";
  }
  next();
};

export default setUser;
