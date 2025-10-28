const pool = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');

class AuthenticationsService {
  async addRefreshToken(token, userId) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1, $2) ON CONFLICT (token) DO NOTHING RETURNING token',
      values: [token, userId],
    };

    await pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await pool.query(query);
  }
}

module.exports = AuthenticationsService;
