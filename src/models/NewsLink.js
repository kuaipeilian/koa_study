const NewsLink = (sequelize, DataTypes) => sequelize.define('NewsLink', {
    id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: '友情链接的URL地址',
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '状态', // 显示/隐藏
    },
    weights: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '权重',
    },
  },
  {
    timestamps: true,
    comment: 'NewsLink',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  
  module.exports = NewsLink;