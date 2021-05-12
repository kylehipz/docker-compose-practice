const { Client } = require('pg');

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'example',
  password: 'example',
  database: 'example'
});

const connect = async () => {
  try {
    await client.connect();
    console.log('CONNECTED!!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
