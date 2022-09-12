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

// HOME
app.get("/", (req, res)=>{
    res.send("Welcome");
});


// INDEX
app.get("/teams", (req, res)=>{
Team.find({}, (error, allTeams)=>{
    res.render("index.ejs", {
        teams: allTeams,
        });
    });
});













app.get("/teams/:id", (req, res)=>{
Team.findById(req.params.id, (err, foundTeam) =>{
    res.render("show.ejs",{
        team: foundTeam,
        });
    });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));