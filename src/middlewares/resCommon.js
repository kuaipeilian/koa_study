module.exports = () => async (ctx, next) => {
  ctx.failLoginError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 401, msg };
  };
  ctx.success =  (msg, data) => {
    ctx.response.status = 200;
    ctx.body = { code: 0, msg, data };
  };
  // 访问数据库异常
  ctx.failSqlError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 1, msg };
  };
  // 系统未知错误
  ctx.failUnknowError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 2, msg };
  };
  // 系统参数错误
  ctx.failParamsError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 3, msg };
  };
  // 用户已经存在
  ctx.failExistedError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 4, msg };
  };
  // 系统权限错误
  ctx.failTokenError =  (msg) => {
    ctx.response.status = 200;
    ctx.body = { code: 401, msg };
  };
  await next();
};