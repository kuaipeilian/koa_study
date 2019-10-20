const {
  createNewsLink, deleteNewsLink, updateNewsLink, getNewsLink, getNewsLinkList
} = require('../services/NewsLinkService.js');

module.exports = {
  'post /api/newsLink/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    await createNewsLink(reqData);
    ctx.success('添加友情链接成功');
  },
  'del /api/newsLink/:id': async (ctx) =>  {
    const { id } = ctx.params;
    await deleteNewsLink(id);
    ctx.success('删除友链成功');
  },
  'post /api/newsLink/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateNewsLink(id, reqData);
      ctx.success('更新友链成功');
    } catch (e) {
      ctx.failSqlError('更新友链失败');
    }
  },
  'get /api/newsLink/list': async (ctx) =>  {
    const newsLinkList = await getNewsLinkList();
    ctx.success('查询newsLink列表成功', newsLinkList);
  },
  'get /api/newsLink/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const newsLink = await getNewsLink(id);
    ctx.success('查询友链详情成功', newsLink);
  },
};