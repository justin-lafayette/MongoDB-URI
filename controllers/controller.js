const express = require("express");

const axios = require("axios");

const cheerio = require("cheerio");

const router = express.Router();
const db = require("../models");

router.get("/", function(req, res) {

    console.log("\n Render Index");

    res.render("index");
});

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

                db.Article.create( result )
                    .then( function( dbArticle ) {

                        console.log(dbArticle);

                    })
                    
                    .catch( function( err ) {

                        console.log(err);

                    })
            })

            // $("Summary").each(function(i, element) {

            //     let result = {};

            //     result.Summary = $(this)
            //         .children("a")
            //         .text();

            //     db.Summary.create ( result )
            //         .then( function( dbSummary ) {

            //             console.log(dbSummary);

            //         })

            //         .catch( function( err ) {

            //             console.log( err )
            //         })
            // })

            console.log("\n Scrape finished");
        })

})

module.exports = router;