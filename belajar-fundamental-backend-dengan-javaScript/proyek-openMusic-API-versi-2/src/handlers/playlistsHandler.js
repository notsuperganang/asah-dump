const PlaylistsService = require('../services/PlaylistsService');
const PlaylistSongsService = require('../services/PlaylistSongsService');
const PlaylistActivitiesService = require('../services/PlaylistActivitiesService');
const CollaborationsService = require('../services/CollaborationsService');
const SongsService = require('../services/SongsService');
const PlaylistValidator = require('../validators/playlists');

const collaborationsService = new CollaborationsService();
const playlistsService = new PlaylistsService(collaborationsService);
const playlistSongsService = new PlaylistSongsService();
const playlistActivitiesService = new PlaylistActivitiesService();
const songsService = new SongsService();

const addPlaylistHandler = async (req, res, next) => {
  try {
    PlaylistValidator.validatePlaylistPayload(req.body);
    const { name } = req.body;
    const { userId } = req.auth;

    const playlistId = await playlistsService.addPlaylist({ name, owner: userId });

    return res.status(201).json({
      status: 'success',
      data: {
        playlistId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistsHandler = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    const playlists = await playlistsService.getPlaylists(userId);

    return res.status(200).json({
      status: 'success',
      data: {
        playlists,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deletePlaylistHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;

    await playlistsService.verifyPlaylistOwner(id, userId);
    await playlistsService.deletePlaylistById(id);

    return res.status(200).json({
      status: 'success',
      message: 'Playlist berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

const addSongToPlaylistHandler = async (req, res, next) => {
  try {
    PlaylistValidator.validatePlaylistSongPayload(req.body);
    const { id } = req.params;
    const { songId } = req.body;
    const { userId } = req.auth;

    // Verify song exists
    await songsService.verifySongExists(songId);

    // Verify playlist access (owner or collaborator)
    await playlistsService.verifyPlaylistAccess(id, userId);

    // Add song to playlist
    await playlistSongsService.addSongToPlaylist(id, songId);

    // Log activity
    await playlistActivitiesService.addActivity(id, songId, userId, 'add');

    return res.status(201).json({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
  } catch (error) {
    next(error);
  }
};

const getSongsFromPlaylistHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;

    // Verify playlist access
    await playlistsService.verifyPlaylistAccess(id, userId);

    // Get playlist info
    const playlist = await playlistsService.getPlaylistById(id);

    // Get songs
    const songs = await playlistSongsService.getSongsFromPlaylist(id);

    return res.status(200).json({
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteSongFromPlaylistHandler = async (req, res, next) => {
  try {
    PlaylistValidator.validatePlaylistSongPayload(req.body);
    const { id } = req.params;
    const { songId } = req.body;
    const { userId } = req.auth;

    // Verify playlist access
    await playlistsService.verifyPlaylistAccess(id, userId);

    // Delete song from playlist
    await playlistSongsService.deleteSongFromPlaylist(id, songId);

    // Log activity
    await playlistActivitiesService.addActivity(id, songId, userId, 'delete');

    return res.status(200).json({
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistActivitiesHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;

    // Verify playlist access
    await playlistsService.verifyPlaylistAccess(id, userId);

    // Get activities
    const activities = await playlistActivitiesService.getActivities(id);

    return res.status(200).json({
      status: 'success',
      data: {
        playlistId: id,
        activities,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPlaylistHandler,
  getPlaylistsHandler,
  deletePlaylistHandler,
  addSongToPlaylistHandler,
  getSongsFromPlaylistHandler,
  deleteSongFromPlaylistHandler,
  getPlaylistActivitiesHandler,
};
