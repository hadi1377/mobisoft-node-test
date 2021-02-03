import errorThrower from "@helpers/errorThrower";
import multer from "multer";
import fs from "fs";
import path from "path";

import config from "./";
import getRandomInt from "@helpers/getRandomInt";

class Multer {
  protected paths: string[];
  protected defaultPath: string[];
  protected extensions: string[] = [];
  protected type: "image" | "video";
  protected isRequired: boolean = true;

  constructor(...paths: string[]) {
    this.paths = paths;
    this.defaultPath = ["resources", "static", "assets", "uploads"];
  }

  public getPath = () =>
    `/${this.defaultPath.join("/")}/${this.paths.join("/")}`;

  public getDefaultPath = () => `/${this.defaultPath.join("/")}`;

  public setExtensions = (...extensions: string[]) => {
    this.extensions = extensions;
  };

  public setType = (type: "image" | "video") => {
    if (type === "image") {
      this.extensions = [...this.extensions, "jpg", "jpeg", "png", "gif"];
    }
  };

  public createDisk = () => {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const newPath = [
          __dirname,
          "..",
          "..",
          ...this.defaultPath,
          ...this.paths,
        ];
        fs.mkdir(path.join(...newPath), { recursive: true }, (err) => {
          console.log(err);
          cb(null, path.join(...newPath));
        });
      },
      filename: (req, file, cb) => {
        const filename = `${getRandomInt(100000, 999999999)}-${
          file.originalname
        }`;
        req.uploadPath = `/${this.defaultPath.join("/")}/${this.paths.join(
          "/"
        )}`;
        cb(null, filename);
      },
    });

    const uploadFile: multer.Multer = multer({
      storage,
      preservePath: false,
      fileFilter: (req, file, callback) => {
        req.uploadFileError = null;
        var ext = path.extname(file.originalname).replace(".", "");
        if (this.extensions.length) {
          if (!this.extensions.includes(ext.toLowerCase())) {
            req.uploadFileError = `You can't upload this file with this format! Allowed extesions:${this.extensions.join(
              ","
            )}`;
            callback(errorThrower(req.uploadFileError as any) as any);
          } else {
            req.uploadFileError = null;
          }
        }
        callback(null, true);
      },
      limits: { fileSize: config.disk.maxSize },
    });
    return uploadFile;
  };
}

export default Multer;
