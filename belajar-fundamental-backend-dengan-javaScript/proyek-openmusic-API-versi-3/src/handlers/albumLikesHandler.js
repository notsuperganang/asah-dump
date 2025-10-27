const AlbumLikesService = require('../services/AlbumLikesService');
const CacheService = require('../services/CacheService');

const cacheService = new CacheService();
const albumLikesService = new AlbumLikesService(cacheService);

const likeAlbumHandler = async (req, res, next) => {
  try {
    const { id: albumId } = req.params;
    const { userId } = req.auth;

    await albumLikesService.likeAlbum(userId, albumId);

    return res.status(201).json({
      status: 'success',
      message: 'Album berhasil disukai',
    });
  } catch (error) {
    next(error);
  }
};

const unlikeAlbumHandler = async (req, res, next) => {
  try {
    const { id: albumId } = req.params;
    const { userId } = req.auth;

    await albumLikesService.unlikeAlbum(userId, albumId);

    return res.status(200).json({
      status: 'success',
      message: 'Batal menyukai album',
    });
  } catch (error) {
    next(error);
  }
};

const getAlbumLikesHandler = async (req, res, next) => {
  try {
    const { id: albumId } = req.params;

    const { likes, source } = await albumLikesService.getLikesCount(albumId);

    const response = res.status(200);

    // Add custom header if data from cache
    if (source === 'cache') {
      response.setHeader('X-Data-Source', 'cache');
    }

    return response.json({
      status: 'success',
      data: {
        likes,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  likeAlbumHandler,
  unlikeAlbumHandler,
  getAlbumLikesHandler,
};
