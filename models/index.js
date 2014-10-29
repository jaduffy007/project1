"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
require("locus");

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// db.User.create({
//   username: "awesomesauce",
//   password: "awesomesauce",
//   email: "awesome@sauce.com"
// });

// db.User.create({
//   username: "awesomesauce2",
//   password: "awesomesauce2",
//   email: "awesome2@sauce.com"
// });

// db.Post.create({
//   title: "TESTING4",
//   description: "THIS IS A TEST 3",
//   UserId: 1
// });

// db.Post.create({
//   title: "TESTING5",
//   description: "THIS IS A TEST 4",
//   UserId: 1
// });

// db.PostsUsers.create({
//   PostId: 1,
//   UserId: 2,
//   isLiked: true
// });

// db.PostsUsers.create({
//   PostId: 2,
//   UserId: 2,
//   isLiked: true
// });


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
