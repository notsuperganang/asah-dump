const SongsService = require('../services/SongsService');

const songsService = new SongsService();

const addSongHandler = async (req, res) => {
  try {
    const {
      title, year, genre, performer, duration, albumId,
    } = req.body;

    // Validasi (lebih ketat)
    // Cek semua field required ada
    if (!title || !year || !genre || !performer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan lagu. Mohon isi title, year, genre, dan performer',
      });
    }

    // Cek tipe data
    if (typeof title !== 'string' || title.trim() === ''
      || typeof genre !== 'string' || genre.trim() === ''
      || typeof performer !== 'string' || performer.trim() === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan lagu. Mohon isi title, year, genre, dan performer dengan benar',
      });
    }

    if (typeof year !== 'number' || !Number.isInteger(year)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan lagu. Year harus berupa angka',
      });
    }

    if (duration !== undefined && duration !== null && typeof duration !== 'number') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan lagu. Duration harus berupa angka jika disertakan',
      });
    }

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
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getSongsHandler = async (req, res) => {
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
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getSongByIdHandler = async (req, res) => {
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
    if (error.message === 'Lagu tidak ditemukan') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const editSongByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, year, genre, performer, duration, albumId,
    } = req.body;

    // Validasi (lebih ketat)
    // Cek semua field required ada
    if (!title || !year || !genre || !performer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui lagu. Mohon isi title, year, genre, dan performer',
      });
    }

    // Cek tipe data
    if (typeof title !== 'string' || title.trim() === ''
      || typeof genre !== 'string' || genre.trim() === ''
      || typeof performer !== 'string' || performer.trim() === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui lagu. Mohon isi title, year, genre, dan performer dengan benar',
      });
    }

    if (typeof year !== 'number' || !Number.isInteger(year)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui lagu. Year harus berupa angka',
      });
    }

    if (duration !== undefined && duration !== null && typeof duration !== 'number') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui lagu. Duration harus berupa angka jika disertakan',
      });
    }

    await songsService.editSongById(id, {
      title, year, genre, performer, duration, albumId,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
  } catch (error) {
    if (error.message.includes('Id tidak ditemukan')) {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const deleteSongByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await songsService.deleteSongById(id);

    return res.status(200).json({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
  } catch (error) {
    if (error.message.includes('Id tidak ditemukan')) {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  addSongHandler,
  getSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
