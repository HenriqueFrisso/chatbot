import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "chatbot",
  password: "chatbot",
  database: "chatbot",
  port: 3306
});
