const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const docrypt = require('../utils/crypt');
const { 
  createUser,
  getUserByUserName,
  getUserList,
  updateUser,
  deleteUser
} = require('../services/UserService');

module.exports = {
  'post /api/user/login': async (ctx) =>  {
    const reqData = ctx.request.body;
    const { userName, password } = reqData;
    if (userName && password) {
      try {
        const existUser = await getUserByUserName(userName);
        if (!existUser) {
          ctx.failExistedError('用户不存在');
        } else {
          const { id, userName } = existUser;
          if (bcrypt.compareSync(password, existUser.password)) {
            const token = jwt.sign({ userName, id }, 'jwtSecret', { expiresIn: '24h' });
            const userInfo = { id, userName };
            ctx.success('登录成功', { token, userInfo });
          } else {
            ctx.failLoginError('登录失败：用户名或密码错误');
          }
        }
      } catch (err) {
        ctx.failUnknowError ('登录失败：服务器内部错误！');
      }
    } else {
      ctx.failParamsError('登录失败: 参数错误');
    }
  },
  'post /api/user/list': async (ctx) =>  {
    const userList = await getUserList(ctx.request.body);
    ctx.success('查询user列表成功', userList);
  },
  'post /api/user/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    reqData.password = docrypt(reqData.password);
    await createUser(reqData);
    ctx.success('添加用户成功');
  },
  'post /api/user/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateUser(id, reqData);
      ctx.success('更新用户成功');
    } catch (e) {
      ctx.failSqlError('更新用户失败');
    }
  },
  'del /api/user/:id': async (ctx) =>  {
    const { id } = ctx.params;
    await deleteUser(id);
    ctx.success('删除用户成功');
  },
};