const express = require('express');

// V1 Handlers
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
  uploadAlbumCoverHandler,
} = require('../handlers/albumsHandler');
const authenticateToken = require('../middlewares/authenticateToken');
const InvariantError = require('../exceptions/InvariantError');
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

// Upload album cover (V3 Criterion 2)
// Prepare multer storage for local filesystem
const coverDir = path.join(__dirname, '..', '..', 'uploads', 'covers');
fs.mkdirSync(coverDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, coverDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const safeExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(ext) ? ext : '.jpg';
    cb(null, `album-${req.params.id}-${Date.now()}${safeExt}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 512000 }, // 512KB
  fileFilter: (_req, file, cb) => {
    if (typeof file.mimetype === 'string' && file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    return cb(new InvariantError('Tipe konten yang diunggah harus gambar'));
  },
});

// Wrapper to properly handle multer errors
const uploadWithErrorHandling = (req, res, next) => {
  const uploadMiddleware = upload.any();
  uploadMiddleware(req, res, (err) => {
    if (err) {
      // Multer errors - handle LIMIT_FILE_SIZE as 413
      if (err.code === 'LIMIT_FILE_SIZE') {
        const error = new Error('Ukuran file terlalu besar');
        error.statusCode = 413;
        error.code = 'LIMIT_FILE_SIZE';
        return next(error);
      }
      // Other multer errors
      return next(err);
    }
    next();
  });
};

// Accept any multipart field and pick 'cover' in handler for robustness
router.post('/albums/:id/covers', uploadWithErrorHandling, uploadAlbumCoverHandler);

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

// Exports routes (V3) - Protected, only playlist owner can export
const { postExportPlaylistHandler } = require('../handlers/exportsHandler');

router.post('/export/playlists/:id', authenticateToken, postExportPlaylistHandler);

module.exports = router;
