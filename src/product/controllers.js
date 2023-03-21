const Product = require("./model")
// const User = require("../users/model")

const getAllGames = async (req, res) => {

    try {
        if (req.authCheck) {
            const user = await Product.findAll(req.body)({
                where: { title: req.authCheck.title }
            });

        }
        res.status(201).json({
            message: "success",
            games: getVideoGame
        })

    } catch (error) {
        res.status(501).json({ message })
    }
};


// for updating price

const updategame = async (req, res) => {
    try {
        if (!req.authCheck) {
            const updategame = await Product.update(req.body)({
                where: { title: req.body.title }
            })
        }

        res.status(201).json({ message: "Success", updategame })
    } catch (error) {
        res.status(501).json({ errorMessage: error })
    }
}



const deleteGame = async (req, res) => {
    try {
        const deletegame = await Product.destroy({ where: { title: req.body.title } });
        res.status(201).json({ message: "Success", deletegame: deletegame })

    } catch (error) {
        res.status(501).json({ errorMessage: error })
    }

};


module.exports = {
    getAllGames,
    deleteGame,
    updategame
};