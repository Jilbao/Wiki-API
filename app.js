//Requirements
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

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

//get /articles
app.get("/articles", (req, res) => {
    ArticleModel.find((err, articles)=>{
        if (!err) {
            res.send(articles);
        }else{
            res.send(err);
        };
    });
   
});
//post /articles
app.post("/articles", (req, res)=>{

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
});
//delete /articles
app.delete("/articles", (req, res)=>{
    ArticleModel.deleteMany((err)=>{
        if (!err) {
            res.send(err);
        } else {
            res.send("Succesfully deleted articles");
        }
    });
});




//Listen
app.listen(port, () => {
    console.log("Server is up port: 3000");
});