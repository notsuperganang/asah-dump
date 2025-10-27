/**
 * Align existing schema to match schema.sql:
 * - Add CHECK constraints to albums and songs
 * - Fix songs.album_id FK to ON DELETE SET NULL
 * - Add songs indexes (title, album_id)
 * - Create user_album_likes + indexes + unique
 * - Create views: v_playlists_with_owner, v_playlist_header, v_album_like_counts
 * - Recreate psa index with DESC order on time
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  // Albums constraints
  pgm.addConstraint('albums', 'albums_name_check', {
    check: 'length(trim(name)) > 0',
  });
  pgm.addConstraint('albums', 'albums_year_check', {
    check: 'year > 0',
  });

  // Songs constraints
  pgm.addConstraint('songs', 'songs_title_check', {
    check: 'length(trim(title)) > 0',
  });
  pgm.addConstraint('songs', 'songs_performer_check', {
    check: 'length(trim(performer)) > 0',
  });
  pgm.addConstraint('songs', 'songs_genre_check', {
    check: 'length(trim(genre)) > 0',
  });
  pgm.addConstraint('songs', 'songs_year_check', {
    check: 'year > 0',
  });

  // Fix songs.album_id FK to ON DELETE SET NULL
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'songs_album_id_fkey' AND table_name = 'songs'
      ) THEN
        ALTER TABLE songs DROP CONSTRAINT songs_album_id_fkey;
      END IF;
    END$$;
  `);
  pgm.addConstraint('songs', 'songs_album_id_fkey', {
    foreignKeys: {
      columns: 'album_id',
      references: 'albums(id)',
      onDelete: 'SET NULL',
    },
  });

  // Songs indexes
  pgm.createIndex('songs', 'album_id', { name: 'songs_album_idx' });
  pgm.createIndex('songs', 'title', { name: 'songs_title_idx' });

  // Recreate psa index with DESC order on time (match schema.sql)
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'psa_playlist_time_idx' AND n.nspname = 'public'
      ) THEN
        DROP INDEX psa_playlist_time_idx;
      END IF;
    END$$;
  `);
  pgm.sql('CREATE INDEX psa_playlist_time_idx ON playlist_song_activities(playlist_id, time DESC)');

  // user_album_likes table
  pgm.createTable('user_album_likes', {
    id: { type: 'TEXT', primaryKey: true },
    user_id: {
      type: 'TEXT',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    album_id: {
      type: 'TEXT',
      notNull: true,
      references: 'albums(id)',
      onDelete: 'CASCADE',
    },
    created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('now()') },
  });
  pgm.addConstraint('user_album_likes', 'user_album_likes_unique', {
    unique: ['user_id', 'album_id'],
  });
  pgm.createIndex('user_album_likes', 'album_id', { name: 'ual_album_idx' });
  pgm.createIndex('user_album_likes', 'user_id', { name: 'ual_user_idx' });

  // Views
  pgm.sql(`
    CREATE OR REPLACE VIEW v_playlists_with_owner AS
    SELECT p.id, p.name, u.username
    FROM playlists p
    JOIN users u ON u.id = p.owner;
  `);
  pgm.sql(`
    CREATE OR REPLACE VIEW v_playlist_header AS
    SELECT p.id, p.name, u.username
    FROM playlists p
    JOIN users u ON u.id = p.owner;
  `);
  pgm.sql(`
    CREATE OR REPLACE VIEW v_album_like_counts AS
    SELECT album_id, COUNT(*)::BIGINT AS likes
    FROM user_album_likes
    GROUP BY album_id;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  // Drop views
  pgm.sql('DROP VIEW IF EXISTS v_album_like_counts');
  pgm.sql('DROP VIEW IF EXISTS v_playlist_header');
  pgm.sql('DROP VIEW IF EXISTS v_playlists_with_owner');

  // Drop user_album_likes and its indexes/constraints implicitly
  pgm.dropTable('user_album_likes');

  // Recreate psa index without DESC (previous state)
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'psa_playlist_time_idx' AND n.nspname = 'public'
      ) THEN
        DROP INDEX psa_playlist_time_idx;
      END IF;
    END$$;
  `);
  pgm.createIndex('playlist_song_activities', ['playlist_id', 'time'], {
    name: 'psa_playlist_time_idx',
  });

  // Drop songs indexes
  pgm.dropIndex('songs', 'album_id', { name: 'songs_album_idx', ifExists: true });
  pgm.dropIndex('songs', 'title', { name: 'songs_title_idx', ifExists: true });

  // Restore songs.album_id FK to CASCADE (previous state)
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'songs_album_id_fkey' AND table_name = 'songs'
      ) THEN
        ALTER TABLE songs DROP CONSTRAINT songs_album_id_fkey;
      END IF;
    END$$;
  `);
  pgm.addConstraint('songs', 'songs_album_id_fkey', {
    foreignKeys: {
      columns: 'album_id',
      references: 'albums(id)',
      onDelete: 'CASCADE',
    },
  });

  // Drop songs constraints
  pgm.dropConstraint('songs', 'songs_title_check', { ifExists: true });
  pgm.dropConstraint('songs', 'songs_performer_check', { ifExists: true });
  pgm.dropConstraint('songs', 'songs_genre_check', { ifExists: true });
  pgm.dropConstraint('songs', 'songs_year_check', { ifExists: true });

  // Drop albums constraints
  pgm.dropConstraint('albums', 'albums_name_check', { ifExists: true });
  pgm.dropConstraint('albums', 'albums_year_check', { ifExists: true });
};

