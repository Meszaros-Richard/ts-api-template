import mysql from "mysql2";
import config from "./config";

export const db = mysql.createPool({
  connectionLimit : 10,
  host            : config.db.host,
  user            : config.db.user,
  password        : config.db.password,
  database        : config.db.database
});