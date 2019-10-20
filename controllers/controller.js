const express = require("express");

const axios = require("axios");

const cheerio = require("cheerio");

const router = express.Router();
const db = require("../models");
const Article = require("../models/Article");
const Note = require("../models/Note");

router.get("/", /* async  */ function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.render("index", {dbArticle})
    })
    .catch(function( err ){
        console.log( err );
    })
    // const articles = await Article.find({});
})

router.get("/scrape", function(req, res) {

    console.log("\n Scrape request received");

    axios.get("http://www.echojs.com/")

        .then(function( response ) {

            console.log("\n Axios request sent");

            console.log("\n Axios response received");

            let $ = cheerio.load( response.data );

            $("article h2").each(function(i, element) {

                let result = {};

                result.title = $(this)
                    .children("a")
                    .text();
                
                result.url = $(this)
                    .children("a")
                    .attr("href");

                // result.summary = $(this)
                //     .children("p")
                //     .text()

                db.Article.create( result )
                    .then( function( dbArticle ) {

                        console.log( dbArticle );

                        console.log("\n Scrape finished");

                    })
                    
                    .catch( function( err ) {

                        console.log( err );

                    })
            })
            
        })
});

router.get("/articles/:id", function(req, res) {

    console.log("\n Article get notes by id: ", req.params.id)

    db.Article.find({ _id: req.params.id })
        .populate("note")

        .then(function( dbNote ) {
            const note = dbNote[0].note
            console.log( note );
            res.json(note)

        })
        .catch(function( err ) {

            res.json( err );

        });

});

router.post("/articles/:id", function(req, res) {

    console.log("\n New note post.body: ", req.body);

    db.Note.create(req.body)
        .then( function( dbNote ) {

            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });

        })
        .then (function( dbArticle ) {

            res.json( dbArticle );

        })
        .catch(function( err ) {

            res.json( err );

        });
});

module.exports = router;