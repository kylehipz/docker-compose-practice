const Post = require('./posts');

jest.mock('./posts');

test('getAllPosts method should return a list of valid posts', () => {
  const posts = Post.getAllPosts();

  expect(posts).toStrictEqual([
    {
      owner: 'Arnold Clavio',
      title: 'Pambansang awit',
      body: 'Lupang hinirang duyan ka ng magiliw'
    },
    {
      owner: 'Mark Zuck',
      title: 'Facebook launches',
      body: 'Social media platform for all people bla bla'
    }
  ]);
});
