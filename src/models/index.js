const sequelize = require('./init-db');

const User = sequelize.import('./User');
const Article = sequelize.import('./Article');
const NewsArticle = sequelize.import('./NewsArticle');
const ColumnType = sequelize.import('./ColumnType');
const NewsLink = sequelize.import('./NewsLink');
const NewsAd = sequelize.import('./NewsAd');
const NewsType = sequelize.import('./NewsType');


sequelize.sync();

// const docrypt = require('../utils/crypt');
// sequelize.sync().then(async () => {
//   const password = docrypt('123456');
//   User.create({
//     userName: 'admin',
//     mobile: '18911681482',
//     password,
//     role: 0,
//   });
// });

module.exports = { 
  NewsAd,
  NewsLink,
  Article,
  NewsArticle,
  User,
  ColumnType,
  NewsType,
  sequelize,
};
