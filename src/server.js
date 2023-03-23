require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // npm i axios
const port = process.env.PORT || 80;
const userRouter = require("./users/routes");
const User = require ("./users/model");
const productRouter = require("./product/routes")
const Product = require ("./product/model")

const app = express();
app.use(cors());

app.use(express.json());

const syncTables = () => {
    User.sync({ alter: true, force: false});
    Product.sync({ alter: true, force: false});
};

app.use(userRouter);
app.use(productRouter);


app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working."})
});

// FE hits /getGames which sends request to API, sends it back to FE
// Client-ID and Authorization header values are here for everyone to use,
// but is best being replaced with template literals:
// "Client-ID": `${process.env.CLIENT_ID}
// "Authorization": `Bearer ${process.env.API_TOKEN}
app.post("/getGames", (req, res) => {
    axios({ url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${process.env.CLIENT_ID}`,
            "Authorization": `Bearer ${process.env.API_TOKEN}`
        },
        data:
            "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
    })
        .then(response => {
                console.log(response.data)
                res.json(response.data)
        })
        .catch(err => {
                res.send(err)
        });
});

app.listen(port, () => {
    syncTables();
    console.log(`App is listening on port: ${port}`);
});