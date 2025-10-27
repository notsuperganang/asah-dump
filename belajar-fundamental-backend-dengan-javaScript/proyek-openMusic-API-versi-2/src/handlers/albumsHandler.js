const AlbumsService = require('../services/AlbumsService');
const AlbumValidator = require('../validators/albums');

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

    return res.status(200).json({
      status: 'success',
      data: {
        album: {
          ...album,
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
