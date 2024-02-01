import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

class Author extends Model {}

Author.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Author',
  }
);

export default User;