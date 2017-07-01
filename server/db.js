var mongoose = require('mongoose');

// 创建数据库并链接数据库
var dbHost = 'mongodb://localhost/myprojectdb';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
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

var filmData = new Schema({
  filmID: String,
  filmUrl: String,
  filmImg: String,
  filmName: String,
  filmScore: Number,
  filmPersons: Array
});

var UserSchema = new Schema({
  name: {type: String, require: true},
  password: {type: String, require: true}
});

var StoreMovie = new Schema({
  filmUrl: String,
  filmImg: String,
  filmName: String,
  filmScore: Number,
  filmPersons: Array
});
// module.exports = db.model('filmdb', filmData, 'filmdb');

// var films = db.model('films', filmData, 'films');

const Models = {
  films: mongoose.model('films', filmData, 'films'),
  StoreMovie: mongoose.model('StoreMovie', StoreMovie, 'StoreMovie'),
  User: mongoose.model('User', UserSchema)
};
module.exports = Models;
// module.exports = mongoose.model('films', filmData, 'films');
// films.find({}, function (err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
