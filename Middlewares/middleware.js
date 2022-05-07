const JWTService = require('../services/JWT');
const tokenModel = require('../Models/token');

async function isValidToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (token) {
            JWTService.verifyToken(token);
            //verification token in db
            const result = await tokenModel.findOne({ token });
            if (result) {
                next();
            } else {
                res.json({ status: "failed", message: "Token is not present in DB" });
            }
        } else {
            res.json({ status: "failed", message: "Token is not present in header" });

        }


    } catch (error) {
        res.json(error);
    }
}

module.exports = isValidToken;
