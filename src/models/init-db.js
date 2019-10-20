const Sequelize = require('sequelize');
const { dbName, uName, pw, dbHost, Options } = require('../configs');

const sequelize = new Sequelize(dbName, uName, pw, {
  host: dbHost,
  dialect: 'mysql',
  dialectOptions: Options,
  logging: false,
  operatorsAliases: true,
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
  },
  sync: { force: false },
  pool: { max: 5, min: 0, idle: 10000 },
});

module.exports = sequelize;