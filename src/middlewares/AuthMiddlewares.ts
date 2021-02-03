import { RequestHandler } from "express";

import errorThrower from "@helpers/errorThrower";

export const isAuth: RequestHandler = (req, res, next) => {
  try {
    if (!req.isAuth) {
      errorThrower(req, 401, [
        { msg: "Access denied! You should be logged in..." },
      ]);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
