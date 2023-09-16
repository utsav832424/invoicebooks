import mysql from "mysql";

const pool = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

pool.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

export default pool;