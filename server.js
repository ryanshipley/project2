// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Team = require("./models/team.js");
const Player = require("./models/player.js");
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


//HOME
app.get("/", (req, res)=>{
    res.redirect("/teams");
});


/* INDEX
@get sets the /teams route.
@find {} finds all teams in the database.
@render renders the index page.
@teams all teams found defined as allTeams.
*/
app.get("/teams", (req, res)=>{
    Team.find({}, (error, allTeams)=>{
        res.render("index.ejs", {
            teams: allTeams,
        });
    });
});

/* NEW
@get sets the /teams/new route.
@render renderst the new team input page.
*/
app.get("/teams/new", (req, res) =>{
    res.render("new.ejs");
});

/* DELETE
@delete deletes the team with the matching id.
@findByIdAndDelete finds the team with matching id and deletes them from the database.
@redirect redirects the user to the index page.
*/
app.delete("/teams/:id", (req, res) =>{
    Team.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect("/teams");
    });
});

/* UPDATE
@put updates the team with the matching id.
@findByIdAndUpdate find the team with matching id and updates their values.
@redirect redirects the user back to the teams show page.
*/
app.put("/teams/:id", (req, res) => {  
	Team.findByIdAndUpdate(
	  req.params.id,
	  req.body,
	  {
		new: true,
	  },
	  (error, updatedTeam) => {
		res.redirect(`/teams/${req.params.id}`);
	  }
	);
  });

/* CREATE 
Used with postman.
@post posts the createdTeam into the database.
@createdTeam the createdTeam.
@redirect redirects the user to the index page.
*/
app.post("/teams", (req, res) =>{
    Team.create(req.body, (error, createdTeam)=>{
        res.redirect("/teams");
    });
});

// app.post("/players", (req, res)=>{
//     Player.create(req.body, (error, createdPlayer)=>{
//         res.redirect("/players");
//     });
// });

/* EDIT
@get edits the team with matching id. Sets the edit route.
@findById finds the team with the matching id.
@foundTeam the team found with the matching id.
@render renders the edit page/form.
*/
app.get("/teams/:id/edit", (req, res)=>{
    Team.findById(req.params.id, (err, foundTeam)=>{
        res.render("edit.ejs", {
            team: foundTeam,
        });
    });
});

/* SHOW
@get sets the show route for each team. Uses matching id.
@findById finds the team with the matching id.
@foundTeam the team found to have the matching id.
@render renderst the teams show page.
*/
app.get("/teams/:id", (req, res)=>{
Team.findById(req.params.id, (err, foundTeam) =>{
    res.render("show.ejs",{
        team: foundTeam,
        });
    });
});

/* Listener
@PORT the port the computer will listen for.
@listen listens for the port and logs the message.
*/
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));