const { nanoid } = require('nanoid');
const pool = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');

class PlaylistSongsService {
  async addSongToPlaylist(playlistId, songId) {
    const id = `ps-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    try {
      const result = await pool.query(query);

      if (!result.rows[0].id) {
        throw new InvariantError('Lagu gagal ditambahkan ke playlist');
      }
    } catch (error) {
      // Handle unique constraint violation (duplicate song in playlist)
      if (error.code === '23505') {
        throw new InvariantError('Lagu sudah ada di playlist');
      }
      throw error;
    }
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer 
             FROM songs s
             LEFT JOIN playlist_songs ps ON ps.song_id = s.id
             WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus dari playlist');
    }
  }
}

module.exports = PlaylistSongsService;
