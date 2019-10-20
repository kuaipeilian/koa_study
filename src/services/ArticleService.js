const { Article, sequelize } = require('../models');

const createArticle = async params => Article.create(params);
const deleteArticle = async id => Article.destroy({ where: {id} });
const updateArticle = async (id, params) => Article.update(params, { where: { id } });
const getArticle = async id => Article.findOne({ where: {id} });

const getArticleList = async (condition) => {
  const size = condition.size || 10;
  const currentPage = condition.currentPage || 1;
  delete condition.size;
  delete condition.currentPage;
  return Article.findAndCountAll({
    where: condition,
    limit: size,
    order: [
      ['updatedAt', 'DESC'],
    ],
    offset: size * (currentPage - 1),
    attributes: ['id', 'title', 'cover', 'keywords', 'updatedAt', 'kinds', 'descriptions'],
  });
};
const preArticle = async id => sequelize.query("select * from Articles where id<? order by updatedAt limit 1", { replacements: [id], type: sequelize.QueryTypes.SELECT});
const nextArticle = async id => sequelize.query("select * from Articles where id>? order by updatedAt limit 1", { replacements: [id], type: sequelize.QueryTypes.SELECT});
const recentArticle = async () => sequelize.query("select * from Articles order by updatedAt DESC limit 10", { type: sequelize.QueryTypes.SELECT });

const findArticleWithKeyword = async condition => {
  let {size, currentPage, keyword} = condition;
  size = Number(size || 10);
  currentPage = Number(currentPage || 10);
  return Article.findAndCountAll({
    limit: size,
    offset: size * (currentPage - 1),
    where: {
      title: {'$like': `%${keyword}%`,},
      '$or': [
        {content: {'$like': `%${keyword}%`,}},
      ],
    },
    order: [
      ['updatedAt', 'DESC'],
    ],
    attributes: ['id', 'title', 'cover', 'keywords', 'updatedAt', 'kinds', 'descriptions'],
  });
};

module.exports =  {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticle,
  getArticleList,
  preArticle,
  nextArticle,
  recentArticle,
  findArticleWithKeyword,
};
