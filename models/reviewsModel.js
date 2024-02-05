import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";
import Book from "./bookModel.js";

class Reviews extends Model {}

Reviews.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Book,
        key: "bookId",
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        min:0,
        max:5
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Reviews",
    hooks: {
      afterCreate: async (review) => {
        try {
          const count = await Reviews.count({
            where: { bookId: review.bookId },
          });
          const book = await Book.findByPk(review.bookId);
          if (book) {
            book.rating = (book.rating * (count - 1) + review.rating) / count;
            book.save();
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
);

export default Reviews;
