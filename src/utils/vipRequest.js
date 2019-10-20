const request = require('request');
const baseUrl = '';

function getUserIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

module.exports = function proxyRequest(req, vreq) {
  const clientIp = getUserIp(vreq);
  const serverName = 'koa_study';

  const header = JSON.parse(JSON.stringify(req.header));
  delete header['host'];
  delete header['origin'];
  delete header['content-length'];
  let url = baseUrl + req.url;
  if (req.method === 'GET') {
    url = baseUrl + (req.url ? `${req.url}&clientIp=${clientIp}&serverName=${serverName}` : '?clientIp=${clientIp}&serverName=${serverName}');
  }
  const options = {
    proxy: baseUrl,
    url: url,
    method: req.method,
    headers: header,
  };
  if (req.method === 'POST') {
    options.body = JSON.stringify({...req.body, clientIp, serverName});
  } 
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    })
  });
};