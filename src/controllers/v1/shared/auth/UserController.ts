import errorThrower from "@helpers/errorThrower";
import UserRepository from "@repositories/UserRepository";
import { RequestHandler } from "express";

class UserController {
  protected userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUserByID: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const { userID } = req.params;
      const user = await this.userRepository.getUserByID(userID);
      res.status(200).json({
        statusCode: 200,
        ...user,
      });
    } catch (err) {
      next(err);
    }
  };

  public getUsersList: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const users = await this.userRepository.getUsersList();
      res.status(200).json({
        statusCode: 200,
        ...users,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
