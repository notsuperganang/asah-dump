const express = require('express');
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

const router = express.Router();

// Albums routes
router.post('/albums', addAlbumHandler);
router.get('/albums/:id', getAlbumByIdHandler);
router.put('/albums/:id', editAlbumByIdHandler);
router.delete('/albums/:id', deleteAlbumByIdHandler);

// Songs routes
router.post('/songs', addSongHandler);
router.get('/songs', getSongsHandler);
router.get('/songs/:id', getSongByIdHandler);
router.put('/songs/:id', editSongByIdHandler);
router.delete('/songs/:id', deleteSongByIdHandler);

module.exports = router;
