const CollaborationsService = require('../services/CollaborationsService');
const PlaylistsService = require('../services/PlaylistsService');
const UsersService = require('../services/UsersService');
const CollaborationValidator = require('../validators/collaborations');

const collaborationsService = new CollaborationsService();
const playlistsService = new PlaylistsService(collaborationsService);
const usersService = new UsersService();

const addCollaborationHandler = async (req, res, next) => {
  try {
    CollaborationValidator.validateCollaborationPayload(req.body);
    const { playlistId, userId } = req.body;
    const { userId: ownerId } = req.auth;

    // Verify user exists
    await usersService.getUserById(userId);

    // Verify playlist owner
    await playlistsService.verifyPlaylistOwner(playlistId, ownerId);

    // Add collaboration
    const collaborationId = await collaborationsService.addCollaboration(playlistId, userId);

    return res.status(201).json({
      status: 'success',
      data: {
        collaborationId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCollaborationHandler = async (req, res, next) => {
  try {
    CollaborationValidator.validateCollaborationPayload(req.body);
    const { playlistId, userId } = req.body;
    const { userId: ownerId } = req.auth;

    // Verify playlist owner
    await playlistsService.verifyPlaylistOwner(playlistId, ownerId);

    // Delete collaboration
    await collaborationsService.deleteCollaboration(playlistId, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCollaborationHandler,
  deleteCollaborationHandler,
};
