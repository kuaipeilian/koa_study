
const {
  getColumnTypeList,CreateColumnTypeList,updateColumnType
} = require('../services/ColumnTypeService');

module.exports = {
  'post /api/type/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    await CreateColumnTypeList(reqData);
    ctx.success('添加栏目成功');
  },
  'put /api/type/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateColumnType(id, reqData);
      ctx.success('修改栏目名称成功');
    } catch (e) {
      ctx.failSqlError('修改栏目名称失败');
    }
  },
  'get /api/type/allType': async (ctx) => {
    let temp = await getColumnTypeList();
    let res = {};
    let len = temp.length;
    for(let i = 0; i < len; i++) {
      let item = temp[i];
      res[item.type]=item.title;
    }
    ctx.success('查询栏目成功', res);
  },
  'get /api/type/typeList': async (ctx) => {
    let temp = await getColumnTypeList();
    ctx.success('查询栏目列表成功', temp);
  },
};