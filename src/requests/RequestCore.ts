import Book from "@models/Book";
import User from "@models/User";
import { query, param, body, check } from "express-validator";

class RequestCore {
  protected funcs = {
    query,
    param,
    body,
    check,
  };
  public isThereModel = (
    location: "param" | "body" | "query",
    modelName: string,
    path: string = `${modelName.toLowerCase()}ID`
  ) => {
    modelName = modelName.toLowerCase();
    return [
      this.funcs[location](path).custom((value) => {
        switch (modelName) {
          case "user":
            return User.findByPk(value).then(
              (user) => user || Promise.reject("User not found!")
            );
          case "book":
            return Book.findByPk(value).then(
              (book) => book || Promise.reject("Book not found!")
            );
          default:
            return Promise.reject("Item not found!");
        }
      }),
    ];
  };
  /**
   *
   * @param location : Can be param, body, query or check!
   * @param fieldName : Is the field's name in the location, e.g, if it is query("email"), it will be email
   * @param modelName : Which model you wanna do this to? User or etc.?
   * @param itemKey : Which key must be unique? id? email?
   * @param messageName: This will be shown in the error message.
   */
  public isUniqueModel = (
    location: "param" | "body" | "query" | "check",
    fieldName: string,
    modelName: string = fieldName,
    itemKey: string = "id",
    messageName: string = fieldName
  ): any[] => {
    const errMessage = `This ${messageName} has already been taken!`;
    return [
      this.funcs[location](fieldName).custom((value) => {
        const whereCondition = {
          where: {
            [itemKey]: value,
          },
        };
        switch (modelName) {
          case "User":
            return User.findOne(whereCondition).then((user) =>
              user ? Promise.reject(errMessage) : true
            );
          default:
            return true;
        }
      }),
    ];
  };
}

export default RequestCore;
