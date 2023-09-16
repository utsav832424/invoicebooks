import mysql from "mysql";
const urlDB = `mysql://root:jTulh0gn00MXVg6ULIOZ@containers-us-west-97.railway.app:7752/railway`;
const pool = mysql.createConnection(urlDB);
// const pool = mysql.createConnection({
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.MYSQL_DB,
//     connectionLimit: 10
// });

pool.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

export default pool;