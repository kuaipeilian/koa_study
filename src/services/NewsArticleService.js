const { NewsArticle, sequelize } = require('../models');

const createArticle = async params => NewsArticle.create(params);
const deleteArticle = async id => NewsArticle.destroy({ where: {id} });
const updateArticle = async (id, params) => NewsArticle.update(params, { where: { id } });
const getArticle = async id => NewsArticle.findOne({ where: {id} });

const getArticleList = async (condition) => {
  const size = condition.size || 10;
  const currentPage = condition.currentPage || 1;
  delete condition.size;
  delete condition.currentPage;
  return NewsArticle.findAndCountAll({
    where: condition,
    limit: size,
    order: [
      ['updatedAt', 'DESC'],
    ],
    offset: size * (currentPage - 1),
    attributes: ['id', 'title', 'cover', 'keywords', 'updatedAt', 'kinds', 'descriptions'],
  });
};

const findArticleWithKeyword = async condition => {
  let {size, currentPage, keyword} = condition;
  size = Number(size || 10);
  currentPage = Number(currentPage || 1);
  return NewsArticle.findAndCountAll({
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
const preArticle = async id => sequelize.query("select * from NewsArticles where id<? order by updatedAt limit 1", { replacements: [id], type: sequelize.QueryTypes.SELECT});
const nextArticle = async id => sequelize.query("select * from NewsArticles where id>? order by updatedAt limit 1", { replacements: [id], type: sequelize.QueryTypes.SELECT});
const recentArticle = async id => sequelize.query("select * from NewsArticles where kinds<>? order by updatedAt DESC limit 10", { replacements: [id], type: sequelize.QueryTypes.SELECT });
// const preArticle = async updateTime => NewsArticle.findAll({
//   limit: 1,
//   order: [
//     ['updatedAt'],
//   ],
//   where: {
//     updatedAt: {
//       $lt: updateTime
//     },
//   },
// });
// const nextArticle = async updatedAt => NewsArticle.findAll({
//   limit: 1,
//   order: [
//     ['updatedAt', 'DESC'],
//   ],
//   where: {
//     updatedAt: {
//       $gt: updatedAt
//     },
//   },
// });

// const recentArticle = async updatedAt => NewsArticle.findAll({
//   limit: 10,
//   order: [
//     ['updatedAt', 'DESC'],
//   ],
// });

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
