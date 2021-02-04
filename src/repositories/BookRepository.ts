import errorThrower from "@helpers/errorThrower";
import Book from "@models/Book";
import User from "@models/User";

class BookRepository {
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
      return errorThrower(null, 500, [{ msg: err }]);
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
      return errorThrower(null, 500, [{ msg: err }]);
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
