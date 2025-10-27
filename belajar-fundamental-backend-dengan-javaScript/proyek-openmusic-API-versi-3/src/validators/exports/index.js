const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const ExportPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: { allow: false } }).required(),
});

const ExportsValidator = {
  validateExportPlaylistPayload: (payload) => {
    const { error } = ExportPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = ExportsValidator;
