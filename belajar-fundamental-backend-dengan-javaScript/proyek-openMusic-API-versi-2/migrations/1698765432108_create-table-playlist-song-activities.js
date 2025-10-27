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
  pgm.createTable('playlist_song_activities', {
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
    song_id: {
      type: 'TEXT',
      notNull: true,
      references: 'songs(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    action: {
      type: 'TEXT',
      notNull: true,
    },
    time: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // Add constraint for action
  pgm.addConstraint('playlist_song_activities', 'psa_action_check', {
    check: "action IN ('add','delete')",
  });

  // Create index for faster queries
  pgm.createIndex('playlist_song_activities', ['playlist_id', 'time'], {
    name: 'psa_playlist_time_idx',
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('playlist_song_activities');
};
