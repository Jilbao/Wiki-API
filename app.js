//Requirements
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

//app setups
const port = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//db setup
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const ArticleModel = mongoose.model("article", articleSchema);

/////////////////////////////////////////Main Route///////////////////////////////////////
app.route("/articles")
    // Get
.get((req, res) => {
    ArticleModel.find((err, articles)=>{
        if (!err) {
            res.send(articles);
        }else{
            res.send(err);
        };
    });
   
})
    // Post
.post((req, res)=>{

    const newArticle = new ArticleModel({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save((err)=>{
        if (!err) {
            res.send("Succesfully added a new article.")
        }else{
            res.send(err);
        };
    });
})
    // Delete
.delete((req, res)=>{
    ArticleModel.deleteMany((err)=>{
        if (!err) {
            res.send("Succesfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});

/////////////////////////////////////////Specific Route///////////////////////////////////////
app.route("/articles/:articleTitle")
    // Get
    .get((req, res) => {
        ArticleModel.findOne({title: req.params.articleTitle}, (err, article)=>{
            if (!err) {
                if (article) {
                    res.send(article);
                } else {
                    res.send("Article can not be found!")
                }
                
            } else {
                res.send(err);
            }
        })
    })
    // Put
    .put((req, res) => {
       
        ArticleModel.replaceOne({title: req.params.articleTitle}, 
            {
                title: req.body.title,
                content: req.body.content
            },
             (err)=>{
                if (!err) {
                    res.send("Succesfully updated the article.");  
                }else{
                    res.send(err);
                }
        });
    })
    // Patch
    .patch((req, res) => {
        ArticleModel.updateOne({title: req.params.articleTitle}, req.body, (err)=>{
                if (!err) {
                    res.send("Succesfully patched the article.")
                } else {
                    res.send(err);
                }
             });
    })
    .delete((req, res) => {
        ArticleModel.deleteOne({title: req.params.articleTitle},(err)=>{
            if (!err) {
                res.send("Succesfully deleted the article.")
            } else {
                res.send(err);
            }
        });
    });



//Listen
app.listen(port, () => {
    console.log("Server is up port: 3000");
});