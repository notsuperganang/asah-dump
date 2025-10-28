const PlaylistsService = require('../services/PlaylistsService');
const CollaborationsService = require('../services/CollaborationsService');
const ExportService = require('../services/ExportService');
const ExportsValidator = require('../validators/exports');

const collaborationsService = new CollaborationsService();
const playlistsService = new PlaylistsService(collaborationsService);
const exportService = new ExportService();

const postExportPlaylistHandler = async (req, res, next) => {
  try {
    ExportsValidator.validateExportPlaylistPayload(req.body);
    const { id: playlistId } = req.params;
    const { targetEmail } = req.body;
    const { userId } = req.auth;

    // Only owner can export
    await playlistsService.verifyPlaylistOwner(playlistId, userId);

    // Publish message to queue, only send playlistId and targetEmail
    await exportService.sendPlaylistExportMessage(playlistId, targetEmail);

    return res.status(201).json({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postExportPlaylistHandler };
