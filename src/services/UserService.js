const { User } = require('../models');

const createUser = async params => User.create(params);
const getUserByUserName = async userName => User.findOne({ where: { userName } });
const getUserList = async (condition) => {
  const { pageSize, currentPage } = condition;
  return User.findAndCountAll({
    limit: pageSize || 10,
    offset: pageSize * (currentPage - 1),
    attributes: ['id', 'userName', 'mobile', 'role'],
  });
};
const updateUser = async (id, params) => User.update(params, { where: { id } });
const deleteUser = async id => User.destroy({ where: {id} });

module.exports =  {
  createUser,
  getUserByUserName,
  getUserList,
  updateUser,
  deleteUser
};
