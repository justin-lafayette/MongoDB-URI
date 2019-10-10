const express = require("express");

const router = express.Router();
const modelIndex = require("../models/index.js");

router.get("/", function(req, res) {

    console.log("\n Render Index");

    res.render("index");
});

