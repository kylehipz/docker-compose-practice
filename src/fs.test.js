const Post = require('./posts');

jest.mock('fs');

test('fs module readfile should return a list of valid posts', () => {
  const posts = Post.getAllPosts();

  expect(posts).toStrictEqual([
    {
      owner: 'Arnold Clavio',
      title: 'Pambansang awit',
      body: 'Lupang hinirang duyan ka ng magiliw'
    }
  ]);
});
