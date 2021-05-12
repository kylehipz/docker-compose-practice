const fs = require('fs');
const Post = require('./posts');

const registerHandler = async (ctx) => {
  const data = ctx.request.body;

  fs.writeFileSync('users.json', data);
};

const getPostsHandler = async (ctx) => {
  const posts = Post.getAllPosts();

  ctx.body = posts;
};

const addPostHandler = async (ctx) => {};

const getProfileHandler = async (ctx) => {};

module.exports = {
  registerHandler,
  getPostsHandler,
  addPostHandler,
  getProfileHandler
};
