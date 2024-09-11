import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

export default connection;
