import { Sequelize } from "sequelize";
import config from "./config.json" assert {type:'json'};

const env = process.env.NODE_ENV || "development";
const sequelizeConfig = config[env];
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);

export default sequelize;
