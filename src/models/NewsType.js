const NewsType = (sequelize, DataTypes) => sequelize.define('NewsType', {
  id: {
    type: DataTypes.INTEGER(8),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.INTEGER(4),
    allowNull: true,
    defaultValue: 1,
    unique: true,
    comment: '栏目的类型',
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
    comment: '栏目的类型中文',
  },
  descriptions: {
    type: DataTypes.STRING(128),
    allowNull: true,
    defaultValue: '',
    comment: '栏目的类型描述',
  },
},
{
  timestamps: false,
  comment: 'NewsType',
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = NewsType;