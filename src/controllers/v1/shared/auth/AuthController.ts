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
        user: registeredUser,
        loginInfo: registeredUser.getJWT(),
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
        user: theUser,
        loginInfo: theUser.getJWT(),
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
export const register: RequestHandler = async (req, res, next) => {
  try {
    errorThrower(req);
    //   const registeredUser = await
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {};
