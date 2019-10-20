const koaJwt = require('koa-jwt');
const pathToRegexp = require('path-to-regexp');

module.exports = () => koaJwt({
  secret: 'jwtSecret',
}).unless((ctx) => {
  if (/^\/api/.test(ctx.path)) {
    // 只要不需要token, 写到下面
    return pathToRegexp([
      '/assets',
      '/api/user/login',
      '/api/base/options',
      '/api/base/areaCodes',
      '/api/article/groupList',
      '/api/article/list',
      '/api/article/:id',
      '/api/article/search',
      '/api/article/:id/3details',
      '/api/newsArticle/groupList',
      '/api/newsArticle/list',
      '/api/newsArticle/:id',
      '/api/newsArticle/search',
      '/api/newsArticle/:id/3details',
      '/api/newsAd/position',
      '/api/tags',
      '/api/send_verify_code',
      '/api/new_receive_trial_klass',
      '/api/receive_results',
      '/api/appointment',
      '/api/coach_applies',
      '/api/newsLink/list',
      '/api/get_app_info',
      '/api/about_us/list',
      '/hermes/sendVerifyCode',
      '/hermes/checkVerifyCode',
      '/api/register',
    ]).test(ctx.path);
  }
  return true;
});