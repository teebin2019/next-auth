import mysql from "mysql2/promise";

// Create the connection to database
export const connect = await mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
