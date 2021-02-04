import path from "path";

import errorThrower from "@helpers/errorThrower";
import Book from "@models/Book";

class DownloadRepository {
  public getBookImage = async (bookID: number | string, ext: string) => {
    try {
      const theBook = await Book.findByPk(bookID);
      if (path.extname(theBook.imagePath) !== `.${ext}`) {
        errorThrower(null, 404, [{ msg: "Image not found!" }]);
      }
      return {
        imagePath: theBook.imagePath,
      };
    } catch (err) {
      throw err;
    }
  };
}

export default DownloadRepository;
