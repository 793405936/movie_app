const http = require('http');  // nodejs的http模块，使用 HTTP 服务器与客户端
var cheerio = require('cheerio'); // cheerio是nodejs的抓取页面的一个包

const url = 'http://v.qq.com/x/list/movie?cate=10001&offset=0&sort=5&pay=-1&theatre=1';

function filterFilmData (html) {
  var $ = cheerio.load(html);
  var filmsData = $('.figures_list').firstChild;
  var img = $(filmsData).find('.figure > img').attr('src');
  console.log(img);
};

http.get(url, function (res) {
  var html = '';

  res.on('data', function (data) {
    html += data;
  });

  res.on('end', function () {
    filterFilmData(html);
  });
}).on('error', function () {
  console.log('获取电影数据出错！');
});

