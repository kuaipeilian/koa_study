const moment = require('moment');

const {
  createArticle, deleteArticle, updateArticle, getArticle, getArticleList, preArticle, nextArticle, recentArticle, findArticleWithKeyword
} = require('../services/ArticleService');
const {
  getColumnTypeList,
} = require('../services/ColumnTypeService');

module.exports = {
  'post /api/article/add': async (ctx) =>  {
    const reqData = ctx.request.body;
    await createArticle(reqData);
    ctx.success('添加article成功');
  },
  'del /api/article/:id': async (ctx) =>  {
    const { id } = ctx.params;
    await deleteArticle(id);
    ctx.success('删除文章成功');
  },
  'put /api/article/:id': async (ctx) =>  {
    const { id } = ctx.params;
    const reqData = ctx.request.body;
    try {
      await updateArticle(id, reqData);
      ctx.success('更新文章成功');
    } catch (e) {
      ctx.failSqlError('更新文章失败');
    }
  },
  'get /api/article/groupList': async (ctx) => {
    let temp = await getColumnTypeList();
    let res = [];
    let len = temp.length;
    for(let i = 0; i < len; i++) {
      let item = temp[i];
      const articleList = await getArticleList({ kinds: item.type });
      res.push({articleList: articleList.rows, type: item.type, title: item.title});
    }
    ctx.success('查询article列表成功', res);
  },
  'get /api/article/:id/3details': async (ctx) =>  {
    // 必须放在 /api/article/groupList 的后面
    const { id } = ctx.params;
    const article = await getArticle(id);
    // const updateTime = moment(article.updatedAt).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
    const [pArticle, nArticle, rArticle] = await Promise.all([preArticle(id), nextArticle(id), recentArticle()]);
    ctx.success('查询文章详情成功', {
      currentArticle: article,
      pArticle: pArticle[0] || '',
      nArticle: nArticle[0] || '',
      rArticle
    });
  },
  'get /api/article/search': async (ctx) => {
    const articleList = await findArticleWithKeyword(ctx.query);
    ctx.success('查询成功', articleList);
  },
  'get /api/article/:id': async (ctx) =>  {
    // 必须放在 /api/article/groupList 的后面
    const { id } = ctx.params;
    const article = await getArticle(id);
    ctx.success('查询文章详情成功', article);
  },
  'post /api/article/list': async (ctx) =>  {
    const articleList = await getArticleList(ctx.request.body);
    ctx.success('查询article列表成功', articleList);
  },
};