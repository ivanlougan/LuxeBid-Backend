const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/model");
const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: "failure" , error: error });
    }
}

const comparePass = async ()