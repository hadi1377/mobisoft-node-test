import User from "@models/User";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      isAuth?: boolean;
      role?: string;
      uploadFileName?: string;
      uploadPath?: string;
      uploadFileError?: string;
    }
  }
}
