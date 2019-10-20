const fs = require('fs');
const uploadOss = require('../utils/uploadOss');
const areaCodes = require('../const/areaCodes');

module.exports = {
  'get /api/base/areacodes': async (ctx) => {
    try {
      const data = areaCodes;
      ctx.success('查询成功', data);
    } catch (err) {
      ctx.failUnknowError ('查询失败: 服务器内部错误！');
    }
  },
  'get /api/base/options': async (ctx) => {
    try {
      const data = {
        roleOpts: [
          { text: '管理员', value: 0 }, 
          { text: '运营', value: 1 }, 
        ],
      };
      ctx.success('查询成功', data);
    } catch (err) {
      ctx.failUnknowError ('查询失败: 服务器内部错误！');
    }
  },
  'post /api/base/upload': async (ctx) => {
    try {
      const { file } = ctx.request.files; // 获取上传文件
      const reader = fs.createReadStream(file.path);
      // 将文件上传到阿里云存储
      const res = await uploadOss(Date.now() + file.name, reader);
      if (res.res.status === 200) {
        ctx.success('上传成功！', res.url);
      } else {
        ctx.failUnknowError ('上传失败：图片服务器错误！');
      }
    } catch (err) {
      ctx.failUnknowError ('查询失败: 服务器内部错误！');
    }
  },
  'post /api/base/vipinfo': async (ctx) => {
    const {version} = ctx.request.body;
    if (isNewVersion(version)) {
      // 如果是新版本刚审核过后展示 
      baseInfo.isShowHomeGift = false;
    } else {
      // 如果是旧版本则一直展示
      baseInfo.isShowHomeGift = true;
    }
    ctx.success('请求成功', baseInfo);
  },
};

function isNewVersion(clientVersion, currentVersion = '1.0.0') {
if (currentVersion === clientVersion) return true;
return false;
}