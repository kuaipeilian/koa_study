const request = require('request');
const isTest = process.env.SQL_ENV === 'test' || process.env.SQL_ENV === 'dev';


module.exports = function proxyRequest(site) {
  if (isTest) {
    return true;
  }
  const option = {
    url: 'http://data.zz.baidu.com/urls?site=news.kuaipeilian.com&token=heDUq9beIIQLay6t', 
    method: 'POST',
    body: site
  }
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    })
  });
};