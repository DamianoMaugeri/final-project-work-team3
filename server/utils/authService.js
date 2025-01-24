const jwt = require('jsonwebtoken');
const secretKey = 'laTuaChiaveSegreta';

function generateToken(user) {
    // Payload con i dati dell'utente
    return jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: '1h', // Il token scade dopo 1 ora
    });
}

module.exports = { generateToken };