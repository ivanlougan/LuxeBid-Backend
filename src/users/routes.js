const { Router } = require("express");
const userRouter = Router();

const { comparePass, tokenCheck, hashPass} = require("../middleware");
const { registerUser, login, updateUser, deleteUser } = require("./controllers");

userRouter.get( "/users/authcheck", tokenCheck, login);

userRouter.post( "/users/registeruser", hashPass, registerUser );
userRouter.post( "/users/login", comparePass, login );

userRouter.put( "/users/updateuser", tokenCheck, updateUser);
userRouter.delete( "/users/deleteuser", tokenCheck, deleteUser);

module.exports = userRouter;