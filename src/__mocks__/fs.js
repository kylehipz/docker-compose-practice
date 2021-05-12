const readFileSync = (filename) => {
  const data = [
    {
      owner: 'Arnold Clavio',
      title: 'Pambansang awit',
      body: 'Lupang hinirang duyan ka ng magiliw'
    }
  ];

  const stringified = JSON.stringify(data);

  const buffered = Buffer.from(stringified, 'UTF8');

  return buffered;
};

module.exports = {
  readFileSync
};
