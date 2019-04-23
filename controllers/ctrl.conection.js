const mariadb = require('mariadb');
const {DBHOST, DBUSER, DBPASS} = require('../config');

const pool = mariadb.createPool({
    host    : DBHOST, 
    user    : DBUSER, 
    password: DBPASS,
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