const Product = require("./model")
const User = require("../users/model")

const getAllGames = async (req, res) => {

    try {
    res.status(201).json({
        message: "success",
        games: getVideoGame
    })

    } catch (error) {
        res.status(501).json({ message })
    }
    
};



module.exports = {
    getAllGames,
};