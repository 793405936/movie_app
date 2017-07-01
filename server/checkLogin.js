module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      console.log('未登录');
      return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      console.log(req.session.user.name + '已登录');
      return res.redirect('back');// 返回之前的页面
    }
    next();
  }
};
