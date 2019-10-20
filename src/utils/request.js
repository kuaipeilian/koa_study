const request = require('request');
const baseUrl = '';

module.exports = function proxyRequest(req) {
  const header = JSON.parse(JSON.stringify(req.header));
  delete header['host'];
  delete header['origin'];
  const options = {
    proxy: baseUrl,
    url: baseUrl + req.url,
    method: req.method,
    headers: header,
  };
  if (req.method === 'POST') {
    options.body = JSON.stringify(req.body);
  } 
  return request({
    ...options
  });
};