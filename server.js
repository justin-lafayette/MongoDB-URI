// NPM Modules
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = ("cheerio");
const exphbs = require("express-handlebars");

const db = require ("./models");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:3000/MongoDB-URI', {useNewUrlParser: true});

app.get("/", function(req, res) {

    res.render()
});

const routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {

    console.log("Listening on: ", PORT);
});