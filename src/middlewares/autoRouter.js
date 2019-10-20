const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const KoaBody = require('koa-body');

module.exports = () => {
  const router = new Router();
  const controllersDir = `${__dirname}/../controllers`;
  fs.readdirSync(controllersDir).filter(f => f.endsWith('.js')).forEach((f) => { 
    // 对每一个js文件的具体请求路径 再 进行匹配
    const mapping = require(`${controllersDir}/${f}`);
    Object.keys(mapping).forEach((url) => {
      if (url.startsWith('get')) {
        router.get(url.substring(4), mapping[url]);
      } else if (url.startsWith('post')) {
        if (url.indexOf('upload') !== -1) {
          router.post(url.substring(5), KoaBody({
            multipart: true,
            strict: false,
            formidable: {
              uploadDir: path.join(__dirname, '../../assets/uploads/'),
            },
          }), mapping[url]);
        } else {
          router.post(url.substring(5), mapping[url]);
        }
      } else if (url.startsWith('put')) {
        router.put(url.substring(4), mapping[url]);
      } else if (url.startsWith('del')) {
        router.del(url.substring(4), mapping[url]);
      } else {
        console.log(`路径有误: ${url}`);
      }
    });
  });
  return router.routes();
};
