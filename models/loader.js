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
                                  omitNull: true,     //only for Postgres
                                  dialectOptions: {encrypt: true}
                                }
                              );

//Import table definition in quiz.js
var quiz = connection.import(path.join(__dirname, 'quiz'));
//Import table definition in comments.js
var comments = connection.import(path.join(__dirname, 'comments'));
//Import table definition in users.js
var users = connection.import(path.join(__dirname, 'users'));
//Import table definition in api_comments.js
var apicomments = connection.import(path.join(__dirname, 'api_comments'));

comments.belongsTo(quiz);
comments.belongsTo(users);
quiz.hasMany(comments);
users.hasMany(comments);

exports.quiz = quiz;
exports.comments = comments;
exports.users = users;
exports.apicomments = apicomments;

//Create and init tables
connection.sync().then(function() {
  //Check table is initiated
  quiz.count().then(function (count){
    //If empty, add a row
    if(count === 0) {
      quiz.create({
        question: "Which is Italy's city capital",
        answer: "Rome"
      });
      quiz.create({
        question: "Which is Portugal's city capital",
        answer: "Lisboa"
      }).then(function(){
        console.log('Initialized Quiz table');
      });
    };
  });
  users.count().then(function (count){
    //If empty, add a row
    if(count === 0) {
      users.create({
        alias: "admin",
        password: "1234"
      });
      users.create({
        alias: "pepe",
        password: "1234"
      }).then(function(){
        console.log('Initialized Users table');
      });
    };
  });
  apicomments.count().then(function (count){
    //If empty, add a row
    if(count === 0) {
      apicomments.create({
        author: "Morgan McCircuit",
        body: "Great picture"
      });
      apicomments.create({
        author: "Bending Bender",
        body: "Excellent Stuff!!"
      }).then(function(){
        console.log('Initialized APIComments table');
      });
      apicomments.create({
        author: "Matías",
        body: "This is a test."
      }).then(function(){
        console.log('Initialized APIComments table');
      });
    };
  });
});
