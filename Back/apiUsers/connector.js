const mariadb = require('mariadb');


async function create_pool() {
    const connexion1 = {
        host: '127.0.0.1', 
        user: 'root', 
        database: "Location",
        password: 'admin',
        connectionLimit: 5
    };

    const connexion2 = {
        host: '127.0.0.1', 
        user: 'root',
        password: 'admin',
        connectionLimit: 5
    };

    try {
        const pool = mariadb.createPool(connexion1);
        // Test the connection
        await pool.getConnection();
        return pool;
    } catch (err) {
        console.error('Failed to connect with connexion1, trying to create database', err);
        const pool1 = mariadb.createPool(connexion2);
        const databaseName = "Location";
        let conn;
        try {
            conn = await pool1.getConnection();
            await conn.query(`CREATE DATABASE ${databaseName}`);
            console.log(`Database ${databaseName} created successfully`);
        } catch (err) {
            console.error('Error creating database', err);
            throw err; // Re-throw the error to be handled by the caller
        } finally {
            if (conn) conn.release();
        }
        // Now, try to connect again with the new database
        const pool = mariadb.createPool(connexion1);
        return pool;
    }
}


module.exports = { create_pool };