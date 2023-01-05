import tedious from "tedious";
const {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  BRIDGE_SQL_DATABASE,
} = require("../../config");

module.exports = {
  doubble: {
    logging: (e:any) => console.log(e),
    dialect: DB_DIALECT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialectModule: tedious,
  },
  bridge: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: BRIDGE_SQL_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: (e:any) => console.log(e),
    dialectModule: tedious,
  },
};
