const { Router } = require("express")
const productRouter = Router();

const { hashPass, tokenCheck } = require("../middleware");
const { getAllGames, updategame, deleteGame } = require("./controllers")


productRouter.get("/product/getGames", tokenCheck, getAllGames);



module.exports = productRouter;