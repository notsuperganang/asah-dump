require('dotenv').config();

module.exports = {
  databaseUrl: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
};
