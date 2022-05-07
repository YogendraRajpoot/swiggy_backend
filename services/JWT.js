const jwt = require('jsonwebtoken');

const SECRET_KEY = "sAlT3DkEy5";

function generateToken(payload) {

    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60s" });
    return token;
}

function verifyToken(token) {
    let data = jwt.verify(token, SECRET_KEY);
    return data;
}

module.exports = {
    generateToken,
    verifyToken
}
