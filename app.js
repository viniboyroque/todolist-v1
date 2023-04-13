//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


const items = ["First", "Second", "Third"];
const workItems = [];


app.get("/", function(req, res){
  
  const day = date.getDate();

  res.render("list", {listTitle: day, newListItem: items});
});



app.post("/", function (req, res) {
    
    
  const item = req.body.item;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); 
  }
});

app.get("/work", function (req, res) {
  res.render("list", {listTitle: "Work List", newListItem: workItems});
});

app.post ("/work", function(req, res) {
  const item = req.body.item;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
  res.redirect("/about");
});




app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000.");
  
});