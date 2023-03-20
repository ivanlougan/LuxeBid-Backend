require("dotenv").config();

const express = require("express");

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working. Yay"})
});

app.listen(port, () => {
    console.log("listening");
})
