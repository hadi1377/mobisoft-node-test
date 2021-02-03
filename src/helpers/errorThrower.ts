import { validationResult } from "express-validator";
import { Request } from "express";

const handleErrors = (
  req: Request,
  code = 422,
  data: Array<{
    msg: string;
  }> = []
) => {
  let errMessage: string;
  switch (code) {
    case 422:
      errMessage = "Unprocessable Entity";
      break;
    case 401:
      errMessage = "Bad Request";
      break;
    case 404:
      errMessage = "Not found";
      break;
    case 401:
      errMessage = "Unauthorized";
      break;
    case 403:
      errMessage = "Forbidden";
      break;
    case 500:
      errMessage = "Internet Server Error";
      break;
    default:
      errMessage = "An error occurred";
  }
  if (!data.length) {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const finalArray = [];
      const validationErrors = validation.array();
      let fields = validationErrors.map((item) => item.param);
      fields = fields.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      for (let i of fields) {
        finalArray.push(validationErrors.find((item) => item.param === i));
      }
      const error: any = new Error(errMessage);
      error.statusCode = code;
      error.data = finalArray;
      throw error;
    }
  } else {
    const error: any = new Error(errMessage);
    error.statusCode = code;
    error.data = data;
    throw error;
  }
};

export default handleErrors;
