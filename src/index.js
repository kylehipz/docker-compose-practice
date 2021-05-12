const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const app = new koa();
const connect = require('./db');

connect();

const handlers = require('./handlers');

app.use(koaBody({ jsonLimit: '2kb' }));

const { port } = process.env;

router
  .post('/register', handlers.registerHandler)
  .get('/users/:id', handlers.getProfileHandler)
  .post('/posts', handlers.addPostHandler)
  .get('/posts', handlers.getPostsHandler);

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
