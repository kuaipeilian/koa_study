const NewsArticle = (sequelize, DataTypes) => sequelize.define('NewsArticle', {
    id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: '文章封面的URL地址',
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      comment: '文章内容',
    },
    kinds: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '文章类型',
    },
    keywords: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '关键字',
    },
    descriptions: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: '描述',
    },
    status: {
      type: DataTypes.ENUM('normal', 'hidden', 'popular'),
      allowNull: true,
      defaultValue: 'normal',
      comment: '描述',
    },
  },
  {
    timestamps: true,
    comment: 'NewsArticle',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  
  module.exports = NewsArticle;