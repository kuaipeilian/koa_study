const { ColumnType } = require('../models');

const getColumnTypeList = async () => ColumnType.findAll();
const updateColumnType = async (id, params) => ColumnType.update(params, { where: { id } });
const CreateColumnTypeList = async params => {
  const res = await ColumnType.findAll({
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
  return ColumnType.create({...params, type});
};
module.exports =  {
  getColumnTypeList,
  CreateColumnTypeList,
  updateColumnType
};