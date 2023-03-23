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
};

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({ where: {username: req.body.username }});
        const match = await bcrypt.compare( req.body.password, req.user.password );
        if(!match) {
            const error = new Error("Password do not match");
            res.status(500).json({ errorMessage: error.message, error: error })
        }
        next();        
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);        
        const user = await User.findOne({ where: { id: decodedToken.id }});
        if (!user) {
             const error = new Error("User Not Authorized");
             res.status(401).json({ errorMessage: error.message, error: error})           
        }
        req.authCheck = user;
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: "failure", error: error});
    }
};
module.exports = { hashPass, tokenCheck, comparePass }