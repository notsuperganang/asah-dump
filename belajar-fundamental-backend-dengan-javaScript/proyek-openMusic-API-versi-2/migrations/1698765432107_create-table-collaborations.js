/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'TEXT',
      primaryKey: true,
    },
    playlist_id: {
      type: 'TEXT',
      notNull: true,
      references: 'playlists(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // Add unique constraint for playlist_id and user_id combination
  pgm.addConstraint('collaborations', 'collaborations_unique', {
    unique: ['playlist_id', 'user_id'],
  });

  // Create indexes for faster queries
  pgm.createIndex('collaborations', 'playlist_id', {
    name: 'collaborations_playlist_idx',
  });

  pgm.createIndex('collaborations', 'user_id', {
    name: 'collaborations_user_idx',
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
