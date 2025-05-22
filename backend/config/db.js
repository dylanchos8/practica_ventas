import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sena',
    database: 'cliente_db'
});
db.connect(err => {
    if (err) throw err;
    console.log("Conectado a la base de datos de MYSQL");
});