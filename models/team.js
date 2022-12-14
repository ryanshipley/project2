const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    continent: {type: String, required: true},
    rank: {type: Number, required: true},
    flag: {type: String, required: true},
    population: {type: Number, required: true}, // No Commas!!!! ex: 215000000
    capitol: {type: String, required: true}, 
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;