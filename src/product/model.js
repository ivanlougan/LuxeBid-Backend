const { DataTypes } = require("sequelize");
const connection = require("../db/connection")

const VideoGame = connection.define("Product",
{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unqiue: true

    },
    studio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
});

module.exports = VideoGame;