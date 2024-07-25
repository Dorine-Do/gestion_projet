const express = require('express')
const { addUser, getAllUsers, getUserById, updateUser, deleteUser, hashPassword } = require('./apiUsers/crudoperations.js');
const { addCars, getAllCars, getCarsById, updateCars, deleteCars } = require('./apiVoitures/crudvoiture.js')
const mariadb = require('mariadb')
const { create_pool } = require('./apiUsers/connector.js');

const app = express()
app.use(express.json());
const port = 3000

const startServer = async () => {
    try {
        const pool = await create_pool();

        app.get('/', (req, res) => {
        res.send('Hello World!')
        asyncFunction()
        })

        app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        })

        app.delete('/delete-user/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await deleteUser(id);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.delete('/delete-car/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await deleteCars(id);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.get('/user/:id',async (req,res) => {
            const { id } = req.params;
            try{
                user = await getUserById(id)
                res.json(user)
            }catch (err){
                res.status(500).send(err.message);
            }
        });

        app.get('/car/:id',async (req,res) => {
            const { id } = req.params;
            try{
                user = await getCarsById(id)
                res.json(user)
            }catch (err){
                res.status(500).send(err.message);
            }
        });

        app.put('/update-user/:id', async (req, res) => {
            const { id } = req.params;
            const { name, lastname, email, telephone, passwords } = req.body;
            try {
                const result = await updateUser(id, name, lastname, email, telephone, passwords);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.put('/update-car/:id', async (req, res) => {
            const { id } = req.params;
            const { marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant } = req.body;
            try {
                const result = await updateCars(id, marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.post('/create-table-cars', async (req, res)=>{
            try {
                conn = await pool.getConnection();
                await conn.query(`CREATE TABLE Cars (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    marque VARCHAR(255) NOT NULL,
                    description VARCHAR(255),
                    climatisation VARCHAR(255) NOT NULL,
                    prix FLOAT NOT NULL,
                    puissance_fiscale INT NOT NULL,
                    consommation FLOAT NOT NULL,
                    pollution VARCHAR(1),
                    type VARCHAR(255) NOT NULL,
                    carburant VARCHAR(255) NOT NULL
                )`);
                res.send('Table created successfully');
                } catch (err) {
                console.error(err);
                res.status(500).send('Error creating table');
            }finally {
            if (conn) conn.release();
            }
        });

        app.post('/create-table-users', async (req, res) => {
            let conn;
            try {
            conn = await pool.getConnection();
            await conn.query(`CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                telephone VARCHAR(255) NOT NULL,
                passwords VARCHAR(255) NOT NULL
            )`);

            res.send('Table created successfully');
                } catch (err) {
                console.error(err);
                res.status(500).send('Error creating table');
            }finally {
            if (conn) conn.release();
            }
            
        });

        app.post('/add-user', async (req, res) => {
            const { name, lastname, email, telephone, passwords} = req.body;
            const password_hash = await hashPassword(passwords)
            try {
                const result = await addUser(name,lastname, email, telephone, password_hash);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.post('/add-car', async (req, res) => {
            const { marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant} = req.body;
            try {
                const result = await addCars(marque, description, climatisation, prix, puissance_fiscale, consomation, pollution, type, carburant);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.post('/add-users', async (req, res) => {
        let conn;
        const users = req.body.users; // attendu un tableau d'objets {name, email}
        try {
            conn = await pool.getConnection();
            const values = await users.map(user => [user.name, user.lastname, user.email,user.telephone, hashPassword(user.passwords)]);
            await conn.batch('INSERT INTO users (name, email) VALUES (?, ?)', values);
            res.send('Users added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding users');
        } finally {
            if (conn) conn.release();
        }
        });
    } catch (err){
        console.error('Failed to create pool', err);
        process.exit(1); // Quitter l'application si la connexion échoue
    }
};

startServer();