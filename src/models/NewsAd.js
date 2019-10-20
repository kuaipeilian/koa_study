const NewsAd = (sequelize, DataTypes) => sequelize.define('NewsAd', {
    id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: '名称',
    },
    client: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: '客户端',
    },
    desc:{
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: '描述',
    },
    height: {
      type: DataTypes.INTEGER(5) || DataTypes.STRING(10),
      allowNull: false,
      comment: '图片高',
    },
    width: {
      type: DataTypes.INTEGER(5) || DataTypes.STRING(10),
      allowNull: false,
      comment: '图片宽',
    },
    imgUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: '图片地址',
    },
    position: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      comment: '广告投放位置',
    },
    status: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        comment: '状态', // 显示/隐藏
    },
    url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '外链地址',
    },
},
  {
    timestamps: true,
    comment: 'NewsAd',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  
  module.exports = NewsAd;