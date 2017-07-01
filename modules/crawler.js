const http = require('http');  // nodejs的http模块，使用 HTTP 服务器与客户端
var cheerio = require('cheerio'); // cheerio是nodejs的抓取页面的一个包
var mongoose = require('mongoose'); // 创建数据库连接

const url = 'http://v.qq.com/x/list/movie?cate=10001&offset=0&sort=5&pay=-1&theatre=1';

var mongourl = 'mongodb://localhost/myprojectdb';

mongoose.Promise = global.Promise;
mongoose.connect(mongourl);
var filmDataLimits = mongoose.Schema({
  filmUrl: String,
  filmImg: String,
  filmName: String,
  filmScore: Number,
  filmPersons: Array
});

var Film = mongoose.model('Film', filmDataLimits);

function filterFilmData (html) {
  var $ = cheerio.load(html);
  var filmsData = $('.figures_list').children('li');

  var filmslist = [];
  filmsData.each(function (item) {
    var filmsdata = $(this);
    var filmUrl = filmsdata.find('a').attr('href');
    var filmImg = filmsdata.find('.figure > img').attr('src');
    var filmName = filmsdata.find('.figure_title_score > strong > a').text();
    var filmScore = filmsdata.find('.figure_title_score > .figure_score > .score_l').text() + '' + filmsdata.find('.figure_title_score > .figure_score > .score_s').text();
    var filmDec = filmsdata.find('.figure_desc').children('a');

    var filmDecPersons = [];
    filmDec.each(function (item) {
      var person = $(this).text();
      filmDecPersons.push(person);
    });

    var filmList = {
      filmUrl: filmUrl,
      filmImg: filmImg,
      filmName: filmName,
      filmScore: filmScore,
      filmDecPersons: filmDecPersons
    };
    filmslist.push(filmList);
  });
  return filmslist;
}

function printFilmListInfo (filmslist) {
  filmslist.forEach(function (item) {
    var filmDatas = new Film({
      filmUrl: item.filmUrl,
      filmImg: item.filmImg,
      filmName: item.filmName,
      filmScore: item.filmScore,
      filmPersons: item.filmDecPersons
    });
    filmDatas.save(function (err) {
      if (err) {
        console.log('保存失败');
        return;
      }
      console.log('保存成功');
    });
  });
}

http.get(url, function (res) {
  var html = '';

  res.on('data', function (data) {
    html += data;
  });

  res.on('end', function () {
    var filmsList = filterFilmData(html);
    printFilmListInfo(filmsList);
  });
}).on('error', function () {
  console.log('获取电影数据出错！');
});

