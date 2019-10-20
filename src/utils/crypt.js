const bcrypt = require('bcryptjs');

const docrypt = (value) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(value, salt);
};

module.exports = docrypt;
