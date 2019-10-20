
const {
  getNewsTypeList,updateNewsType,createNewsTypeList
} = require('../services/NewsTypeService');

module.exports = {
  'post /api/newsType/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    await createNewsTypeList(reqData);
    ctx.success('添加栏目成功');
  },
  'put /api/newsType/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateNewsType(id, reqData);
      ctx.success('修改栏目名称成功');
    } catch (e) {
      ctx.failSqlError('修改栏目名称失败');
    }
  },
  'get /api/newsType/allType': async (ctx) => {
    let temp = await getNewsTypeList();
    let res = {};
    let len = temp.length;
    for(let i = 0; i < len; i++) {
      let item = temp[i];
      res[item.type]=item.title;
    }
    ctx.success('查询栏目成功', res);
  },
  'get /api/newsType/typeList': async (ctx) => {
    let temp = await getNewsTypeList();
    ctx.success('查询栏目列表成功', temp);
  },
};