const { nanoid } = require('nanoid');
const pool = require('../utils/database');

class SongsService {
  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    let query = {
      text: 'SELECT id, title, performer FROM songs',
      values: [],
    };

    const conditions = [];
    const values = [];

    if (title) {
      conditions.push(`title ILIKE $${values.length + 1}`);
      values.push(`%${title}%`);
    }

    if (performer) {
      conditions.push(`performer ILIKE $${values.length + 1}`);
      values.push(`%${performer}%`);
    }

    if (conditions.length > 0) {
      query = {
        text: `SELECT id, title, performer FROM songs WHERE ${conditions.join(' AND ')}`,
        values,
      };
    }

    const result = await pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT id, title, year, performer, genre, duration, album_id as "albumId" FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new Error('Lagu tidak ditemukan');
    }

    return result.rows[0];
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new Error('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new Error('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
