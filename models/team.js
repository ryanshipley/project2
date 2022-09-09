const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    continent: {type: String, required: true},
    rank: {type: Number, required: true},
    flag: {type: String, required: true},
    population: {type: String, required: true},
    capitol: {type: String, required: true},
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;