const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

// V1 Handlers
const {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
} = require('../handlers/albumsHandler');
const {
  addSongHandler,
  getSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
} = require('../handlers/songsHandler');

// V2 Handlers
const { addUserHandler } = require('../handlers/usersHandler');
const {
  postAuthenticationHandler,
  putAuthenticationHandler,
  deleteAuthenticationHandler,
} = require('../handlers/authenticationsHandler');
const {
  addPlaylistHandler,
  getPlaylistsHandler,
  deletePlaylistHandler,
  addSongToPlaylistHandler,
  getSongsFromPlaylistHandler,
  deleteSongFromPlaylistHandler,
  getPlaylistActivitiesHandler,
} = require('../handlers/playlistsHandler');
const {
  addCollaborationHandler,
  deleteCollaborationHandler,
} = require('../handlers/collaborationsHandler');

const router = express.Router();

// Albums routes (V1)
router.post('/albums', addAlbumHandler);
router.get('/albums/:id', getAlbumByIdHandler);
router.put('/albums/:id', editAlbumByIdHandler);
router.delete('/albums/:id', deleteAlbumByIdHandler);

// Songs routes (V1)
router.post('/songs', addSongHandler);
router.get('/songs', getSongsHandler);
router.get('/songs/:id', getSongByIdHandler);
router.put('/songs/:id', editSongByIdHandler);
router.delete('/songs/:id', deleteSongByIdHandler);

// Users routes (V2)
router.post('/users', addUserHandler);

// Authentications routes (V2)
router.post('/authentications', postAuthenticationHandler);
router.put('/authentications', putAuthenticationHandler);
router.delete('/authentications', deleteAuthenticationHandler);

// Playlists routes (V2) - Protected with authentication
router.post('/playlists', authenticateToken, addPlaylistHandler);
router.get('/playlists', authenticateToken, getPlaylistsHandler);
router.delete('/playlists/:id', authenticateToken, deletePlaylistHandler);
router.post('/playlists/:id/songs', authenticateToken, addSongToPlaylistHandler);
router.get('/playlists/:id/songs', authenticateToken, getSongsFromPlaylistHandler);
router.delete('/playlists/:id/songs', authenticateToken, deleteSongFromPlaylistHandler);
router.get('/playlists/:id/activities', authenticateToken, getPlaylistActivitiesHandler);

// Collaborations routes (V2) - Protected with authentication
router.post('/collaborations', authenticateToken, addCollaborationHandler);
router.delete('/collaborations', authenticateToken, deleteCollaborationHandler);

module.exports = router;
