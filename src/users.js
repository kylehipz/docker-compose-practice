const fs = require('fs');

const getUser = ({ email }) => {
  const users = getUsers();

  return users.find((user) => user.email === email);
};

const getUserById = (id) => {
  const users = getUsers();

  return users.find((user) => user.id === id);
};

const getUsers = () => {
  const usersBuffer = fs.readFileSync('./data/users.json');
  return JSON.parse(usersBuffer);
};

const addUser = (user) => {
  const users = getUsers();

  user.id = users.length + 1;
  users.push(user);

  fs.writeFileSync('./data/users.json', JSON.stringify(users));

  return user;
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  addUser
};
