module.exports = {
    app:{
        PORT: process.env.PORT || 3000,
        HOST: process.env.HOST || 'localhost',
    },
    db:{
        HOST: process.env.DBHOST || 'localhost',
        USER: process.env.DBUSER || 'root', 
        PASS: process.env.DBPASS || '1234', 
        PORT: process.env.DBPORT || '3306',
    },
    secret:{
        COOKIE: process.env.COOKIESECRET || 'palabrasecreta',
    }
}