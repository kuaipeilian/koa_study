const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-hangzhou',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});

const testImagesDir = 'm/article/';

const uploadOss = async (objectName, fileName) => client.putStream(testImagesDir + objectName, fileName);

module.exports = uploadOss;