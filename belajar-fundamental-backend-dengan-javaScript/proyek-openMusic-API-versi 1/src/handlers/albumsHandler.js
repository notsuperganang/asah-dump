const AlbumsService = require('../services/AlbumsService');

const albumsService = new AlbumsService();

const addAlbumHandler = async (req, res) => {
  try {
    const { name, year } = req.body;

    // Validasi
    if (!name || !year) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan album. Mohon isi name dan year',
      });
    }

    if (typeof year !== 'number') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan album. Year harus berupa angka',
      });
    }

    const albumId = await albumsService.addAlbum({ name, year });

    return res.status(201).json({
      status: 'success',
      data: {
        albumId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getAlbumByIdHandler = async (req, res) => {
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
    if (error.message === 'Album tidak ditemukan') {
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

const editAlbumByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year } = req.body;

    // Validasi
    if (!name || !year) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui album. Mohon isi name dan year',
      });
    }

    if (typeof year !== 'number') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui album. Year harus berupa angka',
      });
    }

    await albumsService.editAlbumById(id, { name, year });

    return res.status(200).json({
      status: 'success',
      message: 'Album berhasil diperbarui',
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

const deleteAlbumByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await albumsService.deleteAlbumById(id);

    return res.status(200).json({
      status: 'success',
      message: 'Album berhasil dihapus',
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
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
};
