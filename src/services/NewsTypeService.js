const { NewsType } = require('../models');

const getNewsTypeList = async () => NewsType.findAll();
const updateNewsType = async (id, params) => NewsType.update(params, { where: { id } });
const createNewsTypeList = async params => {
  const res = await NewsType.findAll({
    limit: 1,
    order: [
      ['type', 'DESC'],
    ],
    attributes: ['type'],
  });
  let type = 1;
  if (res.length > 0) {
    type = res[0].type + 1;
  }
  return NewsType.create({...params, type});
};
module.exports =  {
  getNewsTypeList,
  createNewsTypeList,
  updateNewsType
};