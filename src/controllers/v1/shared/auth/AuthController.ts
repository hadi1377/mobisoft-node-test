import { RequestHandler } from "express";

import errorThrower from "@helpers/errorThrower";
import AuthRepository from "@repositories/AuthRepository";

class AuthController {
  protected authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public register: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const data: Auth.Register = req.body;
      const registeredUser = await this.authRepository.register(data);
      res.status(200).json({
        statusCode: 200,
        message: "You can login to website right now!",
        ...registeredUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const data: Auth.Login = req.body;
      const theUser = await this.authRepository.findByEmailAndPassword(data);
      res.status(200).json({
        statusCode: 200,
        message: "Successfully logged in!",
        ...theUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public me: RequestHandler = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      statusCode: 200,
      user: user.format(),
    });
  };
}

export default AuthController;
