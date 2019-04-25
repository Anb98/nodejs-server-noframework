const mariadb = require('mariadb');
const {db} = require('../config');

const pool = mariadb.createPool({
    port    : db.PORT,
    host    : db.HOST, 
    user    : db.USER, 
    password: db.PASS,
    database: 'databaseName'
});

const conectarDB = async ()=>{
    try {
        const con = await pool.getConnection();
        return con;
    } catch (error) {
        return error;
    }
}

module.exports = conectarDB();