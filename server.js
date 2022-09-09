// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Team = require("./models/team.js");
require("dotenv").config();
const methodOverride = require("method-override");
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on("error", (err)=> console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// CREATE
app.post("/teams", (req, res) =>{
    Team.create(req.body, (error, createdTeam)=>{
        res.redirect("/teams");
    });
});