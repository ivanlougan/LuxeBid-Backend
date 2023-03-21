const { Router } = require("express");
const userRouter = Router();

const { comparePass, tokenCheck, hashPass} = require("../middleware");
const { registerUser, login } = require("./controllers");

userRouter.post( "/users/registeruser", hashPass, registerUser );
userRouter.post( "/users/login", comparePass, login );

module.exports = userRouter;