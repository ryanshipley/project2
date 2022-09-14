const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    pos: String,
    country: String,
    club: String,
    caps: Number,
    goals: Number,
    age: Number,
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;