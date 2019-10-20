const Qs=require('qs');
const request = require('request');
const isTest = process.env.SQL_ENV === 'test' || process.env.SQL_ENV === 'dev';
const baseUrl = isTest ? 'http://172.16.237.126:9527' : 'http://inner-erlangshen.api.com';

function getUserIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

module.exports = function proxyRequest(req, vreq) {
  const ip = getUserIp(vreq);

  const header = JSON.parse(JSON.stringify(req.header));
  const userAgent = header['user-agent'] || '';
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
    options.body = Qs.stringify({...req.body, ip, userAgent});
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