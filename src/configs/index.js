let dbCfgs;

if (process.env.SQL_ENV === 'dev') {
  dbCfgs = {
    dbName: 'admin_dev',
    uName: 'root',
    pw: 'topred168',
    dbHost: 'localhost',
    Options: {
      socketPath: '/tmp/mysql.sock',
    }
  };
}  else {
  dbCfgs = {
    dbName: 'admin_prod',
    uName: '',
    pw: '',
    dbHost: '',
    Options: {}
  };
}

module.exports = dbCfgs;
