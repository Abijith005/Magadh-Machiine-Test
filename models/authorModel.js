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
    revenue:{
    type:DataTypes.FLOAT,
    allowNull:false,
    defaultValue:0
    },
  },
  {
    sequelize,
    modelName: 'Author',
  }
);

export default Author;