require('dotenv').config();
const pool = require('../src/utils/database');

async function reset() {
  const sql = `
    TRUNCATE TABLE
      playlist_song_activities,
      playlist_songs,
      collaborations,
      user_album_likes,
      authentications,
      playlists,
      songs,
      albums,
      users
    RESTART IDENTITY CASCADE;
  `;

  try {
    await pool.query('BEGIN');
    await pool.query(sql);
    await pool.query('COMMIT');
    console.log('Database cleared successfully.');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Failed to clear database:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

reset();
