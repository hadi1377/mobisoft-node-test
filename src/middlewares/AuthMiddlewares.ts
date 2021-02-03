import { RequestHandler } from "express";

import errorThrower from "@helpers/errorThrower";
import Role from "@models/Role";

export const isAuth: RequestHandler = (req, res, next) => {
  try {
    if (!req.isAuth) {
      const error: any = new Error("Not authorized!");
      error.statusCode = 401;
      error.data = [
        {
          msg: "Access denied! You should be logged in...",
        },
      ];
      throw error;
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminRoleID = await Role.getRoleID("admin");
    if (req.user.roleId != adminRoleID) {
      errorThrower(req, 403, [{ msg: "Access denied!" }]);
    }
    next();
  } catch (err) {
    next(err);
  }
};
