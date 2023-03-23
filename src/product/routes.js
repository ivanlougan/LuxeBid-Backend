const { Router } = require("express");
const productRouter = Router();

const { tokenCheck } = require("../middleware");
const { getAllGames, updateGame, deleteGame, addGame } = require("./controllers");

productRouter.get("/product/getGames", getAllGames);
productRouter.delete("/product/deletegame", tokenCheck, deleteGame);
productRouter.put("/product/updategame", tokenCheck, updateGame);
productRouter.post("/product/addgame", addGame);

module.exports = productRouter;
