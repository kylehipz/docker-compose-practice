const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const https = require('https');
const fs = require('fs');
const router = new Router();
const Post = require('./posts');
const {
  jwtMiddleware,
  checkIfAdmin,
  getPayload,
  generateToken
} = require('./middleware');
const User = require('./users');
const app = new koa();
const connect = require('./db');

connect();

app.use(koaBody({ jsonLimit: '2kb' }));

const { port } = process.env;

router.post('/register', async (ctx) => {
  const newUser = ctx.request.body;
  // set isAdmin to false
  newUser.isAdmin = false;

  const existingUser = User.getUser({
    email: newUser.email,
    password: newUser.password
  });

  // don't register if user exists
  if (existingUser) {
    ctx.status = 400;
    ctx.body = {
      message: 'User already exists'
    };

    return;
  }

  User.addUser(newUser);

  ctx.status = 201;
  ctx.body = newUser;
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  const user = User.getUser({ email, password });

  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: 'Not authorized'
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    token: generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    })
  };
});

router.get('/users', jwtMiddleware(), checkIfAdmin, async (ctx) => {
  const users = User.getUsers();

  ctx.status = 200;
  ctx.body = users;
});

router.post('/posts', jwtMiddleware(), async (ctx) => {
  const post = ctx.request.body;
  // get user
  const payload = getPayload(ctx.request.header.authorization);
  const { name } = payload;
  // set owner to user
  post.owner = name;
  // write the post
  Post.addPost(post);

  ctx.status = 201;
  ctx.body = post;
});

router.get('/posts', jwtMiddleware(), async (ctx) => {
  const posts = Post.getAllPosts();

  ctx.body = posts;
});

app.use(router.routes());

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { message: 'Unauthenticated' };
    } else {
      throw err;
    }
  });
});

const key = fs.readFileSync('./certs/key.pem', 'UTF8');
const cert = fs.readFileSync('./certs/cert.pem', 'UTF8');
//console.log(key);

//app.listen(port, () => {
//console.log(`Server listening on port ${port}`);
//});
https
  .createServer({ key, cert }, app.callback())
  .listen(port, () => console.log(`Listening on port ${port}`));
