const moment = require('moment');
const {
  createNewsAd, deleteNewsAd, updateNewsAd, getNewsAdDetail, getNewsAdList, getNewsAdWithPosition
} = require('../services/NewsAdService.js');

module.exports = {
  'post /api/newsAd/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    await createNewsAd(reqData);
    ctx.success('添加广告成功');
  },
  'del /api/newsAd/:id': async (ctx) =>  {
    const { id } = ctx.params;
    await deleteNewsAd(id);
    ctx.success('删除广告成功');
  },
  'post /api/newsAd/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateNewsAd(id, reqData);
      ctx.success('更新广告成功');
    } catch (e) {
      ctx.failSqlError('更新广告失败');
    }
  },
  'get /api/newsAd/list': async (ctx) =>  {
    const newsAdList = await getNewsAdList(ctx.request.body);
    for(let list of newsAdList) {
        let updatedAt = moment(list.dataValues.updateAt).format('YYYY-MM-DD HH:mm');
        let createdAt = moment(list.dataValues.createdAt).format('YYYY-MM-DD HH:mm');
        list.dataValues.updatedAt = updatedAt;
        list.dataValues.createdAt = createdAt;
    }
    ctx.success('查询资讯站广告列表成功', newsAdList);
  },
  'get /api/newsAd/position': async (ctx) =>  {
    const ad = await getNewsAdWithPosition(ctx.query);
    ctx.success('查询成功', ad);
  },
  'get /api/newsAd/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const newsAd = await getNewsAdDetail(id);
    ctx.success('查询广告详情成功', newsAd);
  },
};