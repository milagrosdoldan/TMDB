const User = require("./User");
const Movie = require("./Movie");
const Tv = require("./Tv");
User.hasMany(Movie);
Movie.belongsTo(User);

User.hasMany(Tv);
Tv.belongsTo(User);

module.exports = { User, Movie, Tv };
