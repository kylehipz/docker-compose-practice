const fs = require('fs');

const getAllPosts = () => {
  const data = fs.readFileSync('./posts.json');
  return JSON.parse(data);
};

const addPost = (post) => {};

module.exports = {
  getAllPosts,
  addPost
};
