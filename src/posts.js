const fs = require('fs');

const getAllPosts = () => {
  const data = fs.readFileSync('./data/posts.json');
  return JSON.parse(data);
};

const addPost = (post) => {
  const posts = getAllPosts();

  posts.push(post);

  fs.writeFileSync('./data/posts.json', JSON.stringify(posts));

  return post;
};

module.exports = {
  getAllPosts,
  addPost
};
