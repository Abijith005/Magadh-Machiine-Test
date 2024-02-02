import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

class Admin extends Model {}

Admin.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
);

export default Admin;