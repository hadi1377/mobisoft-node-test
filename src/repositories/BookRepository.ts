import errorThrower from "@helpers/errorThrower";
import deleteFile from "@helpers/deleteFile";
import Book from "@models/Book";
import User from "@models/User";
import GetBooks from "@classes/book/GetBooks";

class BookRepository {
  public fetchAll = async (query: Book.SearchQueryParams) => {
    try {
      const getBooks = new GetBooks(query);
      const books = await getBooks.exec();
      return {
        books,
      };
    } catch (err) {
      throw err;
    }
  };

  public findById = async (id: number | string) => {
    const theBook = await Book.findByPk(id);
    return {
      book: theBook.format(),
    };
  };

  public createBook = async (user: User, data: Book.ModifyInfo) => {
    try {
      let createdBook = await user.createBook({
        title: data.title,
        description: data.description,
        authors: data.authors,
        categories: data.categories,
        pageCount: data.pageCount,
        publisher: data.publisher,
        publishDate: data.publishDate,
        imagePath: data.imagePath || null,
      });
      createdBook = await createdBook.reload({
        include: this.commonIncludes(),
      });
      return {
        book: createdBook.format(),
      };
    } catch (err) {
      throw err;
    }
  };

  public changeBookImage = async (
    itemID: number | string,
    imagePath: string
  ) => {
    try {
      const theBook = await Book.findByPk(itemID, {
        include: this.commonIncludes(),
      });
      deleteFile(theBook.imagePath);
      theBook.imagePath = imagePath;
      await theBook.save();
      return {
        book: theBook.format(),
      };
    } catch (err) {
      throw err;
    }
  };

  public removeBookImage = async (itemID: number | string) => {
    try {
      const theBook = await Book.findByPk(itemID, {
        include: this.commonIncludes(),
      });
      deleteFile(theBook.imagePath);
      theBook.imagePath = null;
      await theBook.save();
      return {
        book: theBook.format(),
      };
    } catch (err) {
      throw err;
    }
  };

  public findByIdAndUpdateBook = async (
    itemId: number | string,
    data: Book.ModifyInfo
  ) => {
    try {
      const theBook = await Book.findByPk(itemId);
      await theBook.update({
        title: data.title,
        description: data.description,
        authors: data.authors,
        categories: data.categories,
        pageCount: data.pageCount,
        publisher: data.publisher,
        publishDate: data.publishDate,
        imagePath: data.imagePath || theBook.imagePath,
      });
      await theBook.reload({
        include: this.commonIncludes(),
      });
      return {
        book: theBook.format(),
      };
    } catch (err) {
      throw err;
    }
  };

  public findByIdAndDeleteBook = async (itemId: number | string) => {
    try {
      const theBook = await Book.findByPk(itemId);
      await theBook.destroy();
    } catch (err) {
      errorThrower(null, 500, [{ msg: err }]);
    }
  };

  protected commonIncludes = () => [
    {
      model: User,
      as: "user",
    },
  ];
}

export default BookRepository;
