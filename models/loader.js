var path = require ('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/

if (!(process.env.DATABASE_URL)) {
  process.env.DATABASE_URL = 'sqlite://:@:/';
}
console.log(process.env.DATABASE_URL);

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*)\:(.*)@(.*)\:(.*)\/(.*)/);
var db_name   = (url[6]||null);
var user      = (url[2]||null);
var password  = (url[3]||null);
var protocol  = (url[1]||null);
var dialect   = (url[1]||null);
var port      = (url[5]||null);
var host      = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Load ORM handler
var Sequelize = require('sequelize');

//Use ORM for SQLite or Postgres
var connection = new Sequelize(db_name, user, password,
                              { dialect: dialect,
                                protocol: protocol,
                                port: port,
                                host: host,
                                storage: storage,   //only for SQLite
                                omitNull: true }    //only for Postgres
                              );

//Import table definition in quiz.js
var quiz = connection.import(path.join(__dirname, 'quiz'));

exports.quiz = quiz;

//Create and init tables
connection.sync().then(function() {
  //Check table is initiated
  quiz.count().then(function (count){
    //If empty, add a row
    if(count === 0) {
      quiz.create({
        question: "Which is Italy's city capital",
        answer: "Rome"
      }).then(function(){
        console.log('Initialized database with one row');
      });
    };
  });
});
