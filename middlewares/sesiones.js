const sessions = require("client-sessions");
const {secret} = require('../config');

const sessionHandler = sessions({
    cookieName: 'session', // Nombre de la cookie de session
    secret: secret.COOKIE, 
    duration: 24 * 60 * 60 * 1000, // Tiempo de duracion de la cookie
    activeDuration: 1000 * 60 * 5  // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
});

module.exports = sessionHandler;