var mongoose = require('mongoose');

// 创建数据库并链接数据库
var dbHost = 'mongodb://localhost/myprojectdb';
mongoose.Promise = global.Promise;
// mongoose.connect(dbHost);
// var db = mongoose.connection;
// db.on('error', function () {
//   console.log('Database connection error.');
// });
// db.once('open', function () {
//   console.log('The Database has connected.');
// });
// var db = mongoose.connect(dbHost, function (err) {
mongoose.connect(dbHost, function (err) {
  if (err) {
    console.log('Error to connect to DB');
  } else {
    console.log('Connect to DB Successfully!');
  }
});

var filmData = mongoose.Schema({
  filmID: String,
  filmUrl: String,
  filmImg: String,
  filmName: String,
  filmScore: Number,
  filmPersons: Array
});
var users = mongoose.Schema({
  name: {type: String, require: true},
  password: {type: String, require: true},
  rePassword: {type: String, require: true}
});

const Models = {
  films: mongoose.model('films', filmData, 'films'),
  users: mongoose.model('users', users, 'users')
};
// module.exports = db.model('filmdb', filmData, 'filmdb');

// var films = db.model('films', filmData, 'films');

module.exports = Models;

