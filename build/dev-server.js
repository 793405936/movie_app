require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const mongodb = require('mongodb')
var sha1 = require('sha1')
const bodyParser = require('body-parser')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var db = require('../server/db');
var users = db.User;
 var checkNotLogin = require('../server/checkLogin').checkNotLogin;

// app.use(express.urlencoded())//这两句就是用于获取post数据用的
// app.use(express.json())//use要写在所有路由之前，不然该功能就没有被启用

var apiRoutes = express.Router();
apiRoutes.use(bodyParser.json());
apiRoutes.use(bodyParser.urlencoded({extended: false}));

/**
 * session 中间件
 * app.use(session({
 *    secret: 'keyboard cat', // 用来注册session id 到cookie中，相当与一个密钥。
 *    resave: false, // 是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
 *    saveUninitialized: true, // 是否设置session在存储容器中可以给修改
 *    cookie: { secure: true }
 * }))
 */
app.use(session({
  secret: 'myproject',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: false},
  cookie: {maxAge: 2592000000},
  store: new MongoStore({ mongooseConnection: mongoose.connection }) //session存储位置
}));

//session显示出来
// app.use(function (req, res, next) {
//   // req.user= null;
//   if(req.session.user){
//     users.findOne({user: req.session.user}).then(function (err, user) {
//       if(err) return next(err);
//       req.user= user;
//       next();
//     });
//   }else{
//     var user = req.session.user = {}
//     next();
//   }
// })

// app.use(function (req, res, next) {
//   res.user= req.user;
//   // console.log('session data: '+ JSON.stringify(req.session), 'res app locals: '+res.user); //session 打印出来
//   next();
// });

/**
 * 获取电影信息
 */
apiRoutes.get('/', function (req, res) {
  db.films.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('获得数据');
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});

/**
 * 获取收藏的电影信息
 */
apiRoutes.get('/storemovies', function (req, res) {
  db.StoreMovie.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('获得收藏的电影');
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});

/**
 * 用户注册
 */
apiRoutes.post('/signup', function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;
  const rePassword = req.body.rePassword;

  console.log('name: ' + name, 'password: ' + password, 'rePassword:' + rePassword);

  // 服务端验证字段
  try {
    if (!(name.length >= 4 && name.length <= 10)) {
      console.log('用户名长度限制在4到10个字符');
      throw new Error('用户名长度限制在4到10个字符');
    }
    if (!(password.length >= 6 && password.length <= 12)) {
      console.log('密码长度限制在6到12个字符');
      throw new Error('密码长度限制在6到12个字符');
    }
    if (!(password === rePassword)) {
      console.log('两次输入密码不一样，请重新输入');
      throw new Error('两次输入密码不一样，请重新输入');
    }
  } catch (e) {
    // 注册失败，返回注册页
    return res.redirect('/api/signup');
  }

  const user = new users({
    name: name,
    password: sha1(password)
  });
  // 把用户信息保存到数据库
  user.save(function (err, result) {
    if (err) {
      console.log('reg err:' + err);
      throw err;
    } else {
      console.log('用户注册成功');
      res.status(200).end();
    }
  });
});

/**
 * 用户登录
 */
apiRoutes.post('/signin', checkNotLogin, function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  users.findOne({name: name})
    .then(function (user) {
      try{
        if (!user) {
          console.log('用户不存在');
          throw new Error('用户不存在');
        }
        if (sha1(password) !== user.password) {
          console.log('用户名或密码错误');
          throw new Error('用户名或密码错误');
        }
      } catch(e) {
        // 登录失败，返回登录页
          return res.redirect('/api/signin');
      };
        // // 用户信息写入 session
      delete user.password;
      req.session.user = user;
        // // 跳转到主页
      console.log('登录成功');
      console.log('登录用户为：'+user.name);
      res.status(200).send(user.name).end();
    })
});

/**
 * 获取登录信息session
 */
apiRoutes.get('/session', function(req, res, next){
  console.log('111111');
  if(req.session.user){
    console.log('222222');
    console.log(req.session.user);
    res.status(200).send(JSON.stringify(user)).end();
    // users.findOne({user: req.session.user}).then(function (user) {
    //   res.status(200).send(JSON.stringify(user));
    //   console.log(user);
    //   res.end();
    // });
  }else{
    var user = req.session.user = {};
    console.log('33333');
  }

  // if(req.user){
  //   console.log('call mysession: '+ n++);
  //   let username = req.username;
  //   res.status(200).send(username).end();
  // }
  //  else {
  //   console.log('登录用户才能访问');
  //   res.redirect('/api/signin');
  // }

});

/**
 * Middleware 用户权限校验
 */
// function requireLogin(req, res, next) {
//   if(req.user){
//     next();
//   }else{
//     // next(new Error('登录用户才能访问'));
//     console.log('登录用户才能访问');
//   }
// }

/**
 * 收藏电影
 */
apiRoutes.post('/storeMovie', function (req, res, next) {
  const filmName = req.body.filmName;
  const filmUrl = req.body.filmUrl;
  const filmImg = req.body.filmImg;
  const filmScore = req.body.filmScore;
  const filmPersons = req.body.filmPersons;

  console.log('filmName: ' + filmName, 'filmUrl: ' + filmUrl, 'filmImg:' + filmImg);

  const storeMovie = new db.StoreMovie({
    filmName: filmName,
    filmUrl: filmUrl,
    filmImg: filmImg,
    filmScore: filmScore,
    filmPersons: filmPersons,
  });
  // 把用户信息保存到数据库
  storeMovie.save(function (err, result) {
    if (err) {
      console.log('reg err:' + err);
      throw err;
    } else {
      console.log('收藏成功');
      res.status(200).end();
    }
  });
});

/**
 * 退出登录
 */
apiRoutes.get('/logout',function (req,res,next) {
  if (req.session.user) {
    req.session.user = null;
    res.status(200).end();
  }
})

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
