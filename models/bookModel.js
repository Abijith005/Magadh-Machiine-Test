import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import slugify from "slugify";
import Author from "./authorModel.js";

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
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:Author,
        key:'id'
      }
    },
    sellCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
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
    rating:{
      type:DataTypes.FLOAT,
      allowNull:false,
      defaultValue:0,
      validate:{
        min:0,
        max:5
      }
    }
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
