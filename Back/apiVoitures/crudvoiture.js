const mariadb = require('mariadb');
const { create_pool } = require('../apiUsers/connector')


const addCars = async (marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('INSERT INTO Cars (marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

const getAllCars = async () => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Cars');
        return rows;
    } catch (err) {
        throw new Error('Error fetching Carss: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};

const getCarsById = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM Cars WHERE id = ?', [id]);
        return row[0]; // Renvoie le premier résultat
    } catch (err) {
        throw new Error('Error fetching Cars: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};


// Fonction pour mettre à jour un utilisateur
const updateCars = async (id, marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('UPDATE Cars SET marque = ?, description= ?, climatisation= ?, prix= ?, puissance_fiscale= ?, consomation= ?, pollution= ?, type= ?, carburan0= ? WHERE id = ?', [marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant, id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

// Fonction pour supprimer un utilisateur
const deleteCars = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM Cars WHERE id = ?', [id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

module.exports = {
    addCars,
    getAllCars,
    getCarsById,
    updateCars,
    deleteCars
};