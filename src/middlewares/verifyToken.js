const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

module.exports = () => async (ctx, next) => {
  try {
    const token = ctx.header.authorization;
    if (token) {
      const tk = token.split(' ')[1];
      try {
        await verify(tk, 'jwtSecret');
      } catch (err) {
        ctx.failTokenError('权限认证失败: 请重新登录！');
      }
    } else {
      ctx.failTokenError('权限认证失败: token为空');
    }
    await next();
  } catch (err) {
    ctx.failTokenError('系统未知错误');
  }
};