const User = (sequelize, DataTypes) => sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER(8),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: 'ID',
  },
  userName: {
    type: DataTypes.STRING(12),
    unique: true, // 唯一性约束
    allowNull: false,
    comment: '姓名',
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '密码',
  },
  role: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    comment: '角色',
  },
  mobile: {
    type: DataTypes.STRING(11),
    allowNull: true,
    comment: '手机号',
  },
},
{
  timestamps: false,
  comment: 'User',
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = User;