import { RequestHandler } from "express";

import errorThrower from "@helpers/errorThrower";
import DownloadRepository from "@repositories/DownloadRepository";

class DownloadController {
  protected downloadRepository: DownloadRepository;

  constructor() {
    this.downloadRepository = new DownloadRepository();
  }
  public downloadBookImage: RequestHandler = async (req, res, next) => {
    try {
      errorThrower(req);
      const { bookID, ext } = req.params;
      const theImage = await this.downloadRepository.getBookImage(bookID, ext);
      res.download(theImage.imagePath);
    } catch (err) {
      next(err);
    }
  };
}

export default DownloadController;
