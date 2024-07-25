const mariadb = require('mariadb');
const { create_pool } = require('./connector.js');
const { getCarsByIdUser, deleteCars } = require('../apiVoitures/crudvoiture.js')
const bcrypt = require('bcrypt');
const saltRounds = 10; // Nombre de tours pour générer le sel

// Fonction pour hacher un mot de passe
const hashPassword = async (plainPassword) => {
    try {
        // Générer un sel et hacher le mot de passe
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
    }
};

const addUser = async (name, lastname, email, telephone, password) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('INSERT INTO users (name, lastname, email, telephone, passwords) VALUES (?, ?, ?, ?, ?)', [name, lastname, email, telephone, password]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

const getAllUsers = async () => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};

const getUserById = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        return row[0]; // Renvoie le premier résultat
    } catch (err) {
        throw new Error('Error fetching user: ' + err.message);
    } finally {
        if (conn) conn.release();
    }
};


// Fonction pour mettre à jour un utilisateur
const updateUser = async (id, name, lastname, email, telephone, passwords) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    await conn.query('UPDATE users SET name = ?, lastname = ?, email = ?, telephone = ?, passwords = ? WHERE id = ?', [name, lastname, email, telephone, passwords, id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
    const pool = await create_pool();
    let conn;
    try {
    conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM Cars WHERE id_user = ?",[id]);
    try{
    for(let i = 0;i<[rows].length;i++){
        let id_to_suppr = [rows][i].id;
        console.log(id_to_suppr);
        await conn.query('DELETE FROM Cars WHERE id = ?', [id_to_suppr]);
    }
    }catch (err){
        console.error(err)
        throw err
    }
    await conn.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
    console.error(err);
    } finally {
    if (conn) conn.release();
    }
};

module.exports = {
    hashPassword,
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};