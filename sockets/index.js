/**
 * @param {Object} io - Instancia de SocketIO.Server
 */
module.exports = function (io) {
    io.on('connection',(socket)=>{
        console.log('User conected');
        console.log('SocketId:', socket.id);
    });
};