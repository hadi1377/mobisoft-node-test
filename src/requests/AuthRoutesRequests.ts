import { check } from "express-validator";

import RequestCore from "./RequestCore";

class AuthRoutesRequests extends RequestCore {
  public register = () => {
    return [
      this.commonValidationChains("email"),
      this.commonValidationChains("password"),
      this.commonValidationChains("name"),
    ];
  };

  public login = () => {
    return [
      this.commonValidationChains("email"),
      this.commonValidationChains("password"),
    ];
  };

  protected commonValidationChains = (key: string) => {
    const obj = {
      email: check("email")
        .exists()
        .withMessage("Please set your email address!")
        .notEmpty()
        .withMessage("Email can't be empty!")
        .isEmail()
        .withMessage("Email address isn't valid!")
        .trim(),
      password: check("password")
        .exists()
        .withMessage("You should set your password!")
        .isLength({ min: 6, max: 100 })
        .withMessage(
          "Your password's length should be between 6 and 100 characters!"
        ),
      name: check("name")
        .exists()
        .withMessage("Please set your name!")
        .notEmpty()
        .withMessage("Please set your name!")
        .trim(),
    };
    return obj[key];
  };
}

export default AuthRoutesRequests;
