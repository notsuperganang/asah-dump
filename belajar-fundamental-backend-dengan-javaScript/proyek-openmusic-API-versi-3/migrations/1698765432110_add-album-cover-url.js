/**
 * Add cover_url column to albums to store relative path to cover image.
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.addColumn('albums', {
    cover_url: { type: 'TEXT', notNull: false },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropColumn('albums', 'cover_url');
};
