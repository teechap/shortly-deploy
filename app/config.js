//Set environment variables
var Bookshelf = require('bookshelf');
var path = require('path');

var dbHost = process.env.DB_HOST || '127.0.0.1';
var dbUser = process.env.DB_USER || 'your_database_user';
var dbPassword = process.env.DB_PASSWORD || 'password';
var dbName = process.env.DB_NAME || 'shortlydb';
var dbFilestore = process.env.DB_FILESTORE || path.join(__dirname, '../db/shortly.sqlite');


var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    charset: 'utf8',
    filename: dbFilestore,
  }
});

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
