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
app.get("/getGames", async (req, res) => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://www.giantbomb.com/api/games/?api_key=fad54890b63f75702e4857676616df3f8fe589c0&format=json&field_list=id,image,name&limit=10",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.data.results;
      console.log(data)
      res.status(200).json({ data: data });
    } catch (error) {
      console.error(error);
    }
  });

app.listen(port, () => {
    syncTables();
    console.log(`App is listening on port: ${port}`);
});