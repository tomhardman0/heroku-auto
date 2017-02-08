const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/greater-than-design';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(255) not null, email VARCHAR(255) not null, appName VARCHAR(255) not null, active BOOLEAN)');
query.on('end', () => {
  client.end();
  console.log('User table created.');
});
