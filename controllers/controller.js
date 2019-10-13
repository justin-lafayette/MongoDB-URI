const express = require("express");

const axios = require("axios");

const cheerio = require("cheerio");

const router = express.Router();
const db = require("../models");
const Article = require("../models/Article")

// router.get("/", function(req, res) {

//     console.log("\n Render Index");

//     res.render("index");
// });
router.get("/", /* async  */ function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.render("index", {dbArticle})
    })
    .catch(function(err){
        console.log(err);
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

                        console.log(dbArticle);

                    })
                    
                    .catch( function( err ) {

                        console.log(err);

                    })
            })

            console.log("\n Scrape finished");
        })

});

router.get("/articles", function(req, res) {
    
    db.Article.find({})
        .then(function( dbArticle ) {
            
            console.log( dbArticle )
            res.render("index", {dbArticle});

        })
        .catch(function( err ) {

            res.json( err );
            console.log( err );
        })
})

module.exports = router;