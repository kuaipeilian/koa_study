const { NewsLink, sequelize } = require('../models');

const createNewsLink = async params => NewsLink.create(params);
const deleteNewsLink = async id => NewsLink.destroy({ where: {id} });
const updateNewsLink = async (id, params) => NewsLink.update(params, { where: { id } });
const getNewsLink = async id => NewsLink.findOne({ where: {id} });

const getNewsLinkList = async () => {
  return NewsLink.findAll({
    where: {
      status: 1
    },
    attributes: ['id', 'name', 'link', 'status', 'weights'],
  });
};

module.exports =  {
  createNewsLink,
  deleteNewsLink,
  updateNewsLink,
  getNewsLink,
  getNewsLinkList,
};
