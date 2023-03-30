const Product = require("./model")
// const User = require("../users/model")

const getAllGames = async (req, res) => {

    try {
        if (req.authCheck) {
            const getvideogame = await Product.findAll(req.body)
                ({ where: { title: req.authCheck.title } });
            res.status(201).json({ message: "success", getvideogame })
        }
    } catch (error) {
        res.status(501).json({ errorMessage })
    }
};


const addGame = async (req, res) => {
    try {
        const addgame = await Product.create(req.body);

        res.status(201).json({ message: "success", newGame: addgame})
    } catch (error) {
        res.status(501).json({ errorMessage })
    }
};




// for updating price
const updateGame = async (req, res) => {
    try {
        if (!req.authCheck) {
            const error = new Error("User is not authorised");
            res.status(401).json({ errorMessage: error.message, error: error})
        }
        const updategame = await Product.update({ [req.body.updateKey]: req.body.updateValue })
        ({
            where: { title: req.body.title }

        })
        res.status(201).json({ message: "Success", updategame: updategame })
    } catch (error) {
        res.status(501).json({ errorMessage: error })
    }
};

const deleteGame = async (req, res) => {
    try {
        const deletegame = await Product.destroy({ where: { title: req.body.title } });
        res.status(201).json({ message: "Success", deletegame: deletegame })
    } catch (error) {
        res.status(501).json({ errorMessage: error })
    }
};

module.exports = {
    addGame,
    getAllGames,
    deleteGame,
    updateGame
};
