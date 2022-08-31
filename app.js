//Requirements
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

//app setups
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json);
app.use(express.static("public"));
//db setup
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const ArticleModel = mongoose.model("article", articleSchema);




//Listen
app.listen(port, () => {
    console.log("Server is up port: 3000")
});