const SongsService = require('../services/SongsService');
const SongValidator = require('../validators/songs');

const songsService = new SongsService();

const addSongHandler = async (req, res, next) => {
  try {
    SongValidator.validateSongPayload(req.body);
    const {
      title, year, genre, performer, duration, albumId,
    } = req.body;

    const songId = await songsService.addSong({
      title, year, genre, performer, duration, albumId,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        songId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSongsHandler = async (req, res, next) => {
  try {
    const { title, performer } = req.query;

    const songs = await songsService.getSongs({ title, performer });

    return res.status(200).json({
      status: 'success',
      data: {
        songs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSongByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await songsService.getSongById(id);

    return res.status(200).json({
      status: 'success',
      data: {
        song,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editSongByIdHandler = async (req, res, next) => {
  try {
    SongValidator.validateSongPayload(req.body);
    const { id } = req.params;
    const {
      title, year, genre, performer, duration, albumId,
    } = req.body;

    await songsService.editSongById(id, {
      title, year, genre, performer, duration, albumId,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
  } catch (error) {
    next(error);
  }
};

const deleteSongByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    await songsService.deleteSongById(id);

    return res.status(200).json({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSongHandler,
  getSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
