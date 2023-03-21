const { Router } = require("express")
const productRouter = Router();

const { hashPass, tokenCheck } = require("../middleware");
const { getAllGames, updateGame, deleteGame } = require("./controllers")


productRouter.get("/product/getGames", tokenCheck, getAllGames);
productRouter.delete("./product/deletegame", tokenCheck, deleteGame);
productRouter.put("./product/updategame", tokenCheck, updateGame);



module.exports = productRouter;
