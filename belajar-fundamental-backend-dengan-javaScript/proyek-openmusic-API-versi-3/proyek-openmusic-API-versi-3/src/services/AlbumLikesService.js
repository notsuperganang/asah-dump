const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class AlbumLikesService {
  constructor(cacheService) {
    this.pool = new Pool();
    this.cacheService = cacheService;
  }

  async likeAlbum(userId, albumId) {
    // Check if album exists
    const albumQuery = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this.pool.query(albumQuery);
    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    // Check if user already liked this album
    const checkQuery = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const checkResult = await this.pool.query(checkQuery);
    if (checkResult.rows.length > 0) {
      throw new InvariantError('Anda sudah menyukai album ini');
    }

    // Insert like
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes (id, user_id, album_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menyukai album');
    }

    // Delete cache when like is added
    await this.cacheService.delete(`album_likes:${albumId}`);
    return result.rows[0].id;
  }

  async unlikeAlbum(userId, albumId) {
    // Check if album exists
    const albumQuery = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this.pool.query(albumQuery);
    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    // Delete like
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal batal menyukai album');
    }

    // Delete cache when like is removed
    await this.cacheService.delete(`album_likes:${albumId}`);
  }

  async getLikesCount(albumId) {
    // Check if album exists
    const albumQuery = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this.pool.query(albumQuery);
    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    // Try to get from cache first
    try {
      const cachedLikes = await this.cacheService.get(`album_likes:${albumId}`);
      if (cachedLikes !== null) {
        return {
          likes: parseInt(cachedLikes, 10),
          source: 'cache',
        };
      }
    } catch (error) {
      // If cache fails, continue to database
      console.error('Cache error:', error);
    }

    // Get from database
    const query = {
      text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this.pool.query(query);
    const likes = parseInt(result.rows[0].count, 10);

    // Store in cache for 30 minutes (1800 seconds)
    try {
      await this.cacheService.set(`album_likes:${albumId}`, likes.toString(), 1800);
    } catch (error) {
      // If cache fails, continue anyway
      console.error('Cache set error:', error);
    }

    return {
      likes,
      source: 'database',
    };
  }
}

module.exports = AlbumLikesService;
