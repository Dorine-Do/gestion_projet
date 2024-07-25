const mariadb = require('mariadb');
const { create_pool } = require('../apiUsers/connector.js');


const addPayement = async (date_start, end_date, paye, prix_total, id_client, id_car) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('INSERT INTO Payements (start_date, end_date, paye, prix_total, id_client, id_car) VALUES (?, ?, ?, ?, ?, ?)', [date_start, end_date, paye, prix_total, id_client, id_car]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

const getAllPayements = async () => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT start_date, end_date, paye, prix_total, name, lastname, marque FROM Payements LEFT JOIN users ON user.id = Payements.id_client LEFT JOIN Cars ON Cars.id = Payements.id_car');
        return rows;
    } catch (err) {
        throw new Error('Error fetching Payements: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};

const getPayementById = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT start_date, end_date, paye, prix_total, name, lastname, marque FROM Payements LEFT JOIN users ON user.id = Payements.id_client LEFT JOIN Cars ON Cars.id = Payements.id_car WHERE Payements.id = ?', [id]);
        return row[0]; // Renvoie le premier résultat
    } catch (err) {
        throw new Error('Error fetching Payement: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};


// Fonction pour mettre à jour un utilisateur
const updatePayement = async (id, start_date, end_date, paye, prix_total, id_client, id_car) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('UPDATE Payements SET start_date = ?, end_date = ?, paye = ?, prix_total = ?, id_client = ?, id_car = ? WHERE id = ?', [start_date, end_date, paye, prix_total, id_client, id_car, id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

// Fonction pour supprimer un utilisateur
const deletePayement = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM Payements WHERE id = ?', [id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

module.exports = {
    addPayement,
    getAllPayements,
    getPayementById,
    updatePayement,
    deletePayement
};