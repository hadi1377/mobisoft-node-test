import { RequestHandler } from "express";

import errorThrower from "@helpers/errorThrower";
import User from "@models/User";
import baseDir from "@helpers/baseDir";
import getFileExtension from "@helpers/getFileExtension";

export const downloadUserProfile: RequestHandler = async (req, res, next) => {
  try {
    errorThrower(req);
    const { userID } = req.params;
    const user: User = await User.findByPk(userID);
    res.download(
      baseDir(user.profileImage),
      `${process.env.APP_NAME}-${userID}-${getFileExtension(user.profileImage)}`
    );
  } catch (err) {
    next(err);
  }
};
