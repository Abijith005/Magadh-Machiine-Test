import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";
import Book from "./bookModel.js";

class Purchase extends Model {}

Purchase.init(
  {
    purchaseId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:User,
        key:"id"
      }
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model:Book,
        key:"bookId"
      }
    },
    purchaseDate:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      defaultValue: Sequelize.fn('CURDATE'), 
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    sequelize,
    modelName: "Purchase",
    hooks: {
      beforeValidate: async (purchase) => {
        try {
          // purchase.purchaseDate = Sequelize.fn('NOW');
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;

          const lastPurchase = await Purchase.findOne({
            order: [
              [
                sequelize.literal(
                  "CAST(SUBSTRING_INDEX(purchaseId, '-', 1) AS SIGNED)"
                ),
                "DESC",
              ],
              [
                sequelize.literal(
                  "CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(purchaseId, '-', -2), '-', 1) AS SIGNED)"
                ),
                "DESC",
              ],
              [
                sequelize.literal(
                  "CAST(SUBSTRING_INDEX(purchaseId, '-', -1) AS SIGNED)"
                ),
                "DESC",
              ],
            ],
          });

          let count = 1;
          if (
            lastPurchase?.createdAt.getFullYear() == year &&
            lastPurchase?.createdAt.getMonth() + 1 === month
          ) {
            count = parseInt(lastPurchase.purchaseId.split("-")[2]) + 1;
          }

          purchase.purchaseId = `${year}-${month
            .toString()
            .padStart(2, "0")}-${count}`;
        } catch (error) {
          console.error(error);
        }
      },
    },
  }
);

export default Purchase;
