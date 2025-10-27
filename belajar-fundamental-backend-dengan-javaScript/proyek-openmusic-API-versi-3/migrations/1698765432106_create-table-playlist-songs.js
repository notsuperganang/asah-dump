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
  pgm.createTable('playlist_songs', {
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
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // Add unique constraint for playlist_id and song_id combination
  pgm.addConstraint('playlist_songs', 'playlist_songs_unique', {
    unique: ['playlist_id', 'song_id'],
  });

  // Create indexes for faster queries
  pgm.createIndex('playlist_songs', 'playlist_id', {
    name: 'playlist_songs_playlist_idx',
  });

  pgm.createIndex('playlist_songs', 'song_id', {
    name: 'playlist_songs_song_idx',
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};
