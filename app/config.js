//Set environment variables
var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require("mongoose");

var dbHost = process.env.DB_HOST || '127.0.0.1';
var dbUser = process.env.DB_USER || 'your_database_user';
var dbPassword = process.env.DB_PASSWORD || 'password';
var dbName = process.env.DB_NAME || 'shortlydb';
var dbFilestore = process.env.DB_FILESTORE || path.join(__dirname, '../db/shortly.sqlite');

var host = process.env.DB_HOST || "mongodb://locahost";
var name = process.env.DB_NAME || "shortlydb";
mongoose.connect(host + "/" + name);

var db = mongoose.connection;
db.once("open", function(){console.log("MongoDB connection is open")});
db.on("error", function(){console.log("MongoDB connection error")});

module.exports = db;
