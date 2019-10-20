const proxyRequest = require('../utils/request')
const vipRequest = require('../utils/vipRequest')
const registerRequest = require('../utils/registerRequest')

module.exports = {
  'get /api/tags': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'post /api/coach_applies': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'get /api/receive_results': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'post /api/appointment': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'post /api/send_verify_code': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'post /api/new_receive_trial_klass': async (ctx) => {
    const res = await proxyRequest(ctx.request)
    ctx.body = res
  },
  'post /hermes/sendVerifyCode': async (ctx) => {
    const res = await vipRequest(ctx.request, ctx.req);
    if (res.ret) {
      ctx.success(res.resultMsg, res.content);
    } else {
      ctx.failUnknowError(res.resultMsg);
    }
  },
  'post /hermes/checkVerifyCode': async (ctx) => {
    const res = await vipRequest(ctx.request, ctx.req);
    if (res.ret) {
      ctx.success(res.resultMsg, res.content);
    } else {
      ctx.failUnknowError(res.resultMsg);
    }
  },
  'post /api/register': async (ctx) => {
    // 要先校验验证码
    const reqtemp = JSON.parse(JSON.stringify(ctx.request));
    reqtemp.body = JSON.parse(JSON.stringify(ctx.request.body));
    reqtemp.url = '/hermes/checkVerifyCode';
    reqtemp.header['content-type'] = 'application/json;';
    const {areaCode, mobile, codeType, verifyCode} = reqtemp.body;
    reqtemp.body = {areaCode, mobile, codeType, verifyCode};
    const res = await vipRequest(reqtemp, ctx.req);
    if (!res.ret) {
      ctx.failUnknowError(res.resultMsg);
      return;
    }
    delete ctx.request.body['codeType'];
    delete ctx.request.body['verifyCode'];
    const res1 = await registerRequest(ctx.request, ctx.req);
    if (res1.ret) {
      ctx.success(res1.resultMsg, res1.content);
    } else {
      ctx.failUnknowError(res1.resultMsg);
    }
  },
  'get /api/get_app_info': async (ctx) => {
    ctx.success('查询成功', {
      about_us: [
        {
          action_type: 0,
          block: 4,
          cover: 'http://p.oss.kuaipeilian.com/banner/x6i12uvepgg.jpg',
          id: 41,
          link: 'https://edu.qq.com/a/20190528/002656.htm',
          publish: '2019-05-28',
          scores: '腾讯教育',
          sub_title: '腾讯教育 2019.05.28',
          title: '快陪练创始人陆文勇出席国民音乐教育大会公布在线陪练新模式',
          type: 0,
        },
        {
          action_type: 0,
          block: 1,
          cover: 'http://p.oss.kuaipeilian.com/banner/9nggoyk4kw.jpg',
          id: 40,
          link: 'https://static.kuaipeilian.com/common/video/about.mp4',
          publish: '2019-05-21',
          scores: '',
          sub_title: '名师一对一，随时陪你练',
          title: '了解课堂',
          type: 1,
        },
        {
          action_type: 0,
          block: 1,
          cover: 'http://p.oss.kuaipeilian.com/banner/vtokdfp2fvs.jpg',
          id: 43,
          link:
            'https://prd-kpl.oss-cn-shanghai.aliyuncs.com/videos/The%20elephant%20dance.mp4',
          publish: '2019-07-26',
          scores: '',
          sub_title: '从0-1，守护孩子梦想',
          title: '艾伦推荐快陪练',
          type: 1,
        },
        {
          action_type: 0,
          block: 4,
          cover: 'http://p.oss.kuaipeilian.com/banner/w6vdidekgus.jpg',
          id: 32,
          link:
            'https://tech.china.com/article/20190305/kejiyuan0129248244.html',
          publish: '2019-03-05',
          scores: '中华网',
          sub_title:
            '2月26日，快陪练公布了2018年度十佳陪练老师的名单，本次评选根据陪练老师在平台服务期间的好评率和上课量等几项条件综合得出的结果。同时，为感谢陪练老师这一年的辛苦付出，在快陪练公司年会当天快陪练赠与十佳陪练老师每位价值万元的期权和一台电钢琴，快陪练尊师重教，希望在新的一年里和老师们一起成长。',
          title: '快陪练评选年度十佳陪练老师，赠送电钢琴连接公益',
          type: 0,
        },
        {
          action_type: 0,
          block: 4,
          cover: 'http://p.oss.kuaipeilian.com/banner/6nn9ry0yypc.jpg',
          id: 35,
          link: 'http://industry.caijing.com.cn/20190107/4553129.shtml',
          publish: '2019-01-07',
          scores: '财经网',
          sub_title:
            '经过4年的探索，在线教育在2018年进入了高速发展期，在线钢琴陪练在素质教育赛道率先跑通，且正以高质高效的绝对优势撬动3000万琴童支撑起的千亿级钢琴培训市场。在线钢琴陪练赛道上，快陪练已成为钢琴在线陪练第一梯队的品牌。',
          title: '月营收破千万，快陪练成在线素质教育赛道黑马',
          type: 0,
        },
        {
          action_type: 0,
          block: 4,
          cover: 'http://p.oss.kuaipeilian.com/banner/ndo5x99zbw.jpg',
          id: 33,
          link:
            'https://tech.china.com/article/20190225/kejiyuan0129244198.html',
          publish: '2019-02-25',
          scores: '中华网',
          sub_title:
            '为了提供更好的课程服务、提升自己的品牌竞争力，每年都会培育出数万的钢琴学员、拥有20年办学经验的传统老牌琴行盛世雅歌，与知名在线钢琴陪练品牌快陪练达成合作，让陪练作为学琴课程的后端补充服务。',
          title: '快陪练携手盛世雅歌，“高段位”队友共创钢琴课程服务生态圈',
          type: 0,
        },
      ],
      top_banners: [
        {
          cover: 'http://p.oss.kuaipeilian.com/poster/v3yy9ckz1z.jpg',
          name: '新东方俞敏洪鼎力推荐',
          url:
            'https://prd-fe.oss-cn-beijing.aliyuncs.com/common/video/zhufu.mp4??account_id=46960f10-3519-11e9-a2dd-bd799e175fc9&device_name=iPhone%206s&device_system=iOS12.3.1',
          url_has_video: 1,
        },
        {
          cover: 'http://p.oss.kuaipeilian.com/poster/1gytvu9onb9.png',
          name: '琴童家长的陪练必修课',
          url:
            'http://app-h5.kuaipeilian.com/newHome/5??account_id=46960f10-3519-11e9-a2dd-bd799e175fc9&device_name=iPhone%206s&device_system=iOS12.3.1',
          url_has_video: 1,
        },
        {
          cover: 'http://p.oss.kuaipeilian.com/poster/dxeaw5eixbb.png',
          name: '最后3天限时特惠',
          url:
            'http://app-h5.kuaipeilian.com/Xianshi??account_id=46960f10-3519-11e9-a2dd-bd799e175fc9&device_name=iPhone%206s&device_system=iOS12.3.1',
          url_has_video: 0,
        },
        {
          cover: 'http://p.oss.kuaipeilian.com/poster/o3kg9bv72y.jpg',
          name: '推荐好友得赠课',
          url:
            'http://p.parent.kuaipeilian.com/app/go_poster2??account_id=46960f10-3519-11e9-a2dd-bd799e175fc9&device_name=iPhone%206s&device_system=iOS12.3.1',
          url_has_video: 0,
        },
        {
          cover: 'http://p.oss.kuaipeilian.com/poster/urutlyvh18s.png',
          name: '融资详情',
          url:
            'https://mp.weixin.qq.com/s/VELCPUZ8rPKSpO_ylQEM0A??account_id=46960f10-3519-11e9-a2dd-bd799e175fc9&device_name=iPhone%206s&device_system=iOS12.3.1',
          url_has_video: 0,
        },
      ],
    })
  },
  'get /api/about_us/list': async (ctx) => {
    ctx.success('查询成功', [
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/x6i12uvepgg.jpg',
        id: 41,
        link: 'https://edu.qq.com/a/20190528/002656.htm',
        publish: '2019-05-28',
        scores: '腾讯教育',
        sub_title: '腾讯教育 2019.05.28',
        title: '快陪练创始人陆文勇出席国民音乐教育大会公布在线陪练新模式',
        type: 0,
      },
      {
        action_type: 0,
        block: 1,
        cover: 'http://p.oss.kuaipeilian.com/banner/9nggoyk4kw.jpg',
        id: 40,
        link: 'https://static.kuaipeilian.com/common/video/about.mp4',
        publish: '2019-05-21',
        scores: '',
        sub_title: '名师一对一，随时陪你练',
        title: '了解课堂',
        type: 1,
      },
      {
        action_type: 0,
        block: 1,
        cover: 'http://p.oss.kuaipeilian.com/banner/vtokdfp2fvs.jpg',
        id: 43,
        link:
          'https://prd-kpl.oss-cn-shanghai.aliyuncs.com/videos/The%20elephant%20dance.mp4',
        publish: '2019-07-26',
        scores: '',
        sub_title: '从0-1，守护孩子梦想',
        title: '艾伦推荐快陪练',
        type: 1,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/w6vdidekgus.jpg',
        id: 32,
        link: 'https://tech.china.com/article/20190305/kejiyuan0129248244.html',
        publish: '2019-03-05',
        scores: '中华网',
        sub_title:
          '2月26日，快陪练公布了2018年度十佳陪练老师的名单，本次评选根据陪练老师在平台服务期间的好评率和上课量等几项条件综合得出的结果。同时，为感谢陪练老师这一年的辛苦付出，在快陪练公司年会当天快陪练赠与十佳陪练老师每位价值万元的期权和一台电钢琴，快陪练尊师重教，希望在新的一年里和老师们一起成长。',
        title: '快陪练评选年度十佳陪练老师，赠送电钢琴连接公益',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/6nn9ry0yypc.jpg',
        id: 35,
        link: 'http://industry.caijing.com.cn/20190107/4553129.shtml',
        publish: '2019-01-07',
        scores: '财经网',
        sub_title:
          '经过4年的探索，在线教育在2018年进入了高速发展期，在线钢琴陪练在素质教育赛道率先跑通，且正以高质高效的绝对优势撬动3000万琴童支撑起的千亿级钢琴培训市场。在线钢琴陪练赛道上，快陪练已成为钢琴在线陪练第一梯队的品牌。',
        title: '月营收破千万，快陪练成在线素质教育赛道黑马',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/ndo5x99zbw.jpg',
        id: 33,
        link: 'https://tech.china.com/article/20190225/kejiyuan0129244198.html',
        publish: '2019-02-25',
        scores: '中华网',
        sub_title:
          '为了提供更好的课程服务、提升自己的品牌竞争力，每年都会培育出数万的钢琴学员、拥有20年办学经验的传统老牌琴行盛世雅歌，与知名在线钢琴陪练品牌快陪练达成合作，让陪练作为学琴课程的后端补充服务。',
        title: '快陪练携手盛世雅歌，“高段位”队友共创钢琴课程服务生态圈',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/kibgejeciy.jpg',
        id: 34,
        link:
          'http://caijing.chinadaily.com.cn/chanye/2018-12/18/content_37414143.htm',
        publish: '2018-12-18',
        scores: '中国日报网',
        sub_title:
          '由北京音乐家协会主办，音乐周报及快陪练等单位协办的2019北京钢琴音乐节12月14日在北京日报新闻采编中心召开新闻发布会，本届音乐节以“展示才华，互相学习，共谱中国梦”为主题，以钢琴演奏会的形式进行，使热爱学习钢琴的青少年及中老年朋友们都能参与表演，提高学习的积极性。对于再次牵手国内知名钢琴艺术节合作，快陪练创始人兼CEO陆文勇表示，快陪练希望能够和更多的钢琴老师一同协作，让孩子们爱上钢琴，共同携手让钢琴教育市场越来越好，这与北京钢琴音乐节的宗旨不谋而合。',
        title: '快陪练牵手北京音协，陆文勇匠心深耕音乐教育',
        type: 0,
      },
      {
        action_type: 0,
        block: 1,
        cover: 'http://p.oss.kuaipeilian.com/banner/yn9acc2ihg.jpg',
        id: 26,
        link: 'https://static.kuaipeilian.com/common/video/newcamera.mp4',
        publish: '2019-04-11',
        scores: '',
        sub_title: '轻松安装，立刻练琴',
        title: '快陪练镜头使用教程',
        type: 1,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/99gvdlgtula.jpg',
        id: 31,
        link: 'https://www.jiemodui.com/N/98732',
        publish: '2018-08-03',
        scores: '芥末堆',
        sub_title:
          '芥末堆8月3日讯，今日，在线钢琴陪练品牌“快陪练”宣布获得5000万人民币（等值美元）天使轮融资，高榕资本领投，IDG资本跟投，投后估值2亿元。据悉，该笔融资刷新了艺术教育天使轮融资最高记录。  1、本文是复制于芥末堆网https://www.jiemodui.com文章，转载需到底部关于我们内容合作了解详情 2、芥末堆不接受通过公关费、车马费等任何形式发布失实文章，只呈现有价值的内容给读者；  3、如果你也从事教育，并希望被芥末堆报道，请您 通过顶部导航寻求报道 填写信息告诉我们。',
        title: '靠双边平台模式切入钢琴陪练，“快陪练”获5000万元天使轮融资',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/di5qv03ai29.jpg',
        id: 28,
        link: 'http://industry.caijing.com.cn/20181203/4542780.shtml',
        publish: '2018-12-03',
        scores: '新华网',
        sub_title:
          '在11月30日举办的第九届新华教育论坛上，凭借优质的师资力量、创新的运营模式以及具有竞争力的用户口碑，国内知名1对1在线钢琴陪练平台——快陪练，经过近三个月的审核和票选，最终从多家参选知名品牌中脱颖而出，获得"2018口碑影响力儿童教育机构"大奖。',
        title: '快陪练荣获新华网“2018口碑影响力儿童教育机构”大奖',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/ap9hvf3rlho.jpg',
        id: 36,
        link: 'http://biz.ifeng.com/a/20181218/45263098_0.shtml',
        publish: '2018-12-18',
        scores: '凤凰网',
        sub_title:
          '12月14日，快陪练携手北京音乐家协会、音乐周报等机构在京举办2019北京钢琴音乐节新闻发布会，并向观众公布了2019北京钢琴音乐节的活动细节。国内知名在线钢琴陪练品牌——快陪练，作为本届音乐节唯一的官方合作伙伴，将全程参与2019北京钢琴音乐节并为其提供各项支持。',
        title: '快陪练携手北京音协，共同助力2019北京钢琴音乐节顺利开展',
        type: 0,
      },
      {
        action_type: 0,
        block: 1,
        cover: 'http://p.oss.kuaipeilian.com/banner/dekv1rtinsw.jpg',
        id: 24,
        link: 'http://app-h5.kuaipeilian.com/ComProblems',
        publish: '2019-04-11',
        scores: '',
        sub_title: '如何使用快陪练',
        title: '常见问答',
        type: 0,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/lyrpd2ppucf.jpg',
        id: 27,
        link: 'https://36kr.com/p/5190557',
        publish: '2019-04-02',
        scores: '36氪首发',
        sub_title:
          '36氪获悉，在线钢琴陪练品牌「快陪练」完成1000万美元Pre-A轮投资，CCV创世伙伴资本领投、高榕资本、IDG资本及新东方教育科技集团董事长俞敏洪、前美团COO干嘉伟个人参与跟投。',
        title:
          '36氪首发 | 「快陪练」完成1000万美元Pre-A轮投资，创世伙伴领投，高榕、IDG、俞敏洪等跟投',
        type: 0,
      },
      {
        action_type: 0,
        block: 1,
        cover: 'http://p.oss.kuaipeilian.com/banner/i9fnno3ca2s.jpg',
        id: 37,
        link: 'https://static.kuaipeilian.com/common/video/zhufu.mp4',
        publish: '2019-04-12',
        scores: '',
        sub_title: '钢琴陪练就选快陪练',
        title: '新东方创始人俞敏洪鼎力推荐',
        type: 1,
      },
      {
        action_type: 0,
        block: 4,
        cover: 'http://p.oss.kuaipeilian.com/banner/ic1dwqphfk.jpg',
        id: 39,
        link:
          'https://xw.qq.com/edu/20190505006738/EDU2019050500673800?from=groupmessage\u0026isappinstalled=0',
        publish: '2019-05-06',
        scores: '腾讯教育',
        sub_title: '',
        title: '2019北京钢琴音乐节开幕 快陪练携手北京音协助力钢琴教育发展',
        type: 0,
      },
    ])
  },
}
