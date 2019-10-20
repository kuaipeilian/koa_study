const path = require('path');
const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const KoaStatic = require('koa-static2');

const verifyToken = require('./middlewares/verifyToken');
const cfgToken = require('./middlewares/cfgToken');
const apiRoutes = require('./middlewares/autoRouter');
const logUrl = require('./middlewares/logUrl');
const resCommon = require('./middlewares/resCommon');

const app = new Koa();

app.use(resCommon());
app.use(verifyToken());
app.use(cors());
app.use(bodyParser());
app.use(json());
app.use(logger());
app.use(KoaStatic('assets', path.resolve(__dirname, '../assets')));
app.use(cfgToken());
app.use(logUrl());
app.use(apiRoutes());
app.listen(5800);

console.log('通过 http://localhost:5800/ 访问服务器');