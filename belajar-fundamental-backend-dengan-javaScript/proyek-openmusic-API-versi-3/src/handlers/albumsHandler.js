const path = require('path');
const fs = require('fs');
const AlbumsService = require('../services/AlbumsService');
const AlbumValidator = require('../validators/albums');
const InvariantError = require('../exceptions/InvariantError');

const albumsService = new AlbumsService();

const addAlbumHandler = async (req, res, next) => {
  try {
    AlbumValidator.validateAlbumPayload(req.body);
    const { name, year } = req.body;

    const albumId = await albumsService.addAlbum({ name, year });

    return res.status(201).json({
      status: 'success',
      data: {
        albumId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAlbumByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await albumsService.getAlbumById(id);
    const songs = await albumsService.getSongsByAlbumId(id);

    // Build coverUrl if present
    const HOST = process.env.HOST || 'localhost';
    const PORT = process.env.PORT || 5000;
    const coverUrl = album.cover_url
      ? `http://${HOST}:${PORT}/${album.cover_url}`
      : null;

    return res.status(200).json({
      status: 'success',
      data: {
        album: {
          id: album.id,
          name: album.name,
          year: album.year,
          coverUrl,
          songs,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const editAlbumByIdHandler = async (req, res, next) => {
  try {
    AlbumValidator.validateAlbumPayload(req.body);
    const { id } = req.params;
    const { name, year } = req.body;

    await albumsService.editAlbumById(id, { name, year });

    return res.status(200).json({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAlbumByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    await albumsService.deleteAlbumById(id);

    return res.status(200).json({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
};

// Upload cover handler
const uploadAlbumCoverHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Ensure album exists
    const album = await albumsService.getAlbumById(id);

    // Multer must provide file (accept 'cover' or any single file)
    let { file } = req;
    if (!file && Array.isArray(req.files)) {
      file = req.files.find((f) => f.fieldname === 'cover') || req.files[0];
    }
    if (!file) {
      throw new InvariantError('Berkas cover wajib diunggah');
    }

    // Build relative storage path
    const { filename } = file;
    const relativePath = path.posix.join('uploads', 'covers', filename);

    // Remove old cover file if exists
    if (album.cover_url) {
      try {
        const oldAbs = path.join(__dirname, '..', '..', album.cover_url);
        if (fs.existsSync(oldAbs)) fs.unlinkSync(oldAbs);
      } catch (_e) {
        // ignore
      }
    }

    // Update DB with new cover path
    await albumsService.updateAlbumCover(id, relativePath);

    return res.status(201).json({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
  } catch (error) {
    next(error);
  }
};

module.exports.uploadAlbumCoverHandler = uploadAlbumCoverHandler;
