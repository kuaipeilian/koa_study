const moment = require('moment');
const inclusionRequest = require('../utils/inclusionRequest');

const {
  createArticle, deleteArticle, updateArticle, getArticle, getArticleList, preArticle, nextArticle, recentArticle, findArticleWithKeyword
} = require('../services/NewsArticleService');
const {
  getNewsTypeList,
} = require('../services/NewsTypeService');

module.exports = {
  'post /api/newsArticle/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    const temp = await createArticle(reqData);
    // 主去推送收录
    await inclusionRequest(`http://news.kuaipeilian.com/list/${temp.kinds}/detail/${temp.id}`);
    ctx.success('添加article成功');
  },
  'del /api/newsArticle/:id': async (ctx) =>  {
    const { id } = ctx.params;
    await deleteArticle(id);
    ctx.success('删除文章成功');
  },
  'put /api/newsArticle/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateArticle(id, reqData);
      ctx.success('更新文章成功');
    } catch (e) {
      ctx.failSqlError('更新文章失败');
    }
  },
  'get /api/newsArticle/groupList': async (ctx) => {
    let temp = await getNewsTypeList();
    let res = [];
    let len = temp.length;
    for(let i = 0; i < len; i++) {
      let item = temp[i];
      const articleList = await getArticleList({ kinds: item.type });
      res.push({articleList: articleList.rows, type: item.type, title: item.title});
    }
    ctx.success('查询article列表成功', res);
  },
  'get /api/newsArticle/search': async (ctx) => {
    const articleList = await findArticleWithKeyword(ctx.query);
    ctx.success('查询成功', articleList);
  },
  'get /api/newsArticle/:id/3details': async (ctx) =>  {
    // 必须放在 /api/newsArticle/groupList 的后面
    const { id } = ctx.params;
    const newsArticle = await getArticle(id);
    // const updateTime = moment(newsArticle.updatedAt).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
    const [pArticle, nArticle, rArticle] = await Promise.all([preArticle(id), nextArticle(id), recentArticle(id)]);
    ctx.success('查询文章详情成功', {
      currentArticle: newsArticle,
      pArticle: pArticle[0] || '',
      nArticle: nArticle[0] || '',
      rArticle
    });
  },
  'get /api/newsArticle/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const newsArticle = await getArticle(id);
    ctx.success('查询文章详情成功', newsArticle);
  },
  'post /api/newsArticle/list': async (ctx) =>  {
    const articleList = await getArticleList(ctx.request.body);
    ctx.success('查询article列表成功', articleList);
  },
};