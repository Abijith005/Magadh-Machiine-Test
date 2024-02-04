import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import slugify from "slugify";

class Book extends Model {}

Book.init(
  {
    bookId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull:false
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 100,
        max: 1000,
      },
    },
  },
  {
    sequelize,
    modelName: "Book",
    hooks: {
      beforeValidate: async (book) => {
        try {
          const count = await Book.count();
          book.bookId = `book_${count + 1}`;
              book.title = slugify(book.title, { lower: true });
        } catch (error) {
          console.error(error);
        }
      }
    },
  }
);

export default Book;
