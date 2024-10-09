import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro_eleitoral',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default async function conectar() {
    return pool.getConnection();
}
