import mysql from 'mysql2/promise';

// Create connection pool for better performance and reliability
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_perpustakaan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export pool for use in server actions
export default pool;