const { DataTypes } = require("sequelizd");
const connection = require("../db/connection")

const VideoGame = connection.define("",
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
    
})

module.exports = VideoGame;