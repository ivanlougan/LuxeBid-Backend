const { Router } = require("express");
const userRouter = Router();

const { registerUser, login } = require("./controllers");

userRouter.post( "/users/registeruser", registerUser );
userRouter.post( "/users/login", login );

module.exports = userRouter;