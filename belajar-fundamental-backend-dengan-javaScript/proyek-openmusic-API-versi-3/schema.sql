-- =========================================================
-- OpenMusic API v2 - Database Schema (PostgreSQL)
-- =========================================================
-- Catatan:
-- - Aplikasi yang membangkitkan ID (format: user-xxx, song-xxx, dst).
-- - Semua kolom string wajib non-kosong (CEK TRIM <> '').
-- - FK disetel CASCADE/SET NULL sesuai kebutuhan bisnis.
-- =========================================================

-- =============== USERS & AUTH =============================
CREATE TABLE users (
  id         TEXT PRIMARY KEY,
  username   TEXT NOT NULL UNIQUE CHECK (length(trim(username)) > 0),
  password   TEXT NOT NULL CHECK (length(trim(password)) > 0), -- hashed
  fullname   TEXT NOT NULL CHECK (length(trim(fullname)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Refresh token harus tersimpan di DB (lihat kriteria autentikasi).
CREATE TABLE authentications (
  token      TEXT PRIMARY KEY,                             -- refresh token
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX authentications_user_idx ON authentications(user_id);

-- =============== ALBUMS & SONGS ==========================
CREATE TABLE albums (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL CHECK (length(trim(name)) > 0),
  year       INTEGER NOT NULL CHECK (year > 0),
);

CREATE TABLE songs (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL CHECK (length(trim(title)) > 0),
  year       INTEGER NOT NULL CHECK (year > 0),
  performer  TEXT NOT NULL CHECK (length(trim(performer)) > 0),
  genre      TEXT NOT NULL CHECK (length(trim(genre)) > 0),
  duration   INTEGER,                                      -- detik, optional
  album_id   TEXT REFERENCES albums(id) ON DELETE SET NULL,
);
CREATE INDEX songs_album_idx ON songs(album_id);
CREATE INDEX songs_title_idx ON songs(title);

-- =============== PLAYLISTS ================================
CREATE TABLE playlists (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL CHECK (length(trim(name)) > 0),
  owner      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX playlists_owner_idx ON playlists(owner);

-- pivot many-to-many playlist <-> songs
CREATE TABLE playlist_songs (
  id          TEXT PRIMARY KEY,
  playlist_id TEXT NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  song_id     TEXT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (playlist_id, song_id)
);
CREATE INDEX playlist_songs_playlist_idx ON playlist_songs(playlist_id);
CREATE INDEX playlist_songs_song_idx     ON playlist_songs(song_id);

-- =============== COLLABORATIONS (Wajib Tambahan 1) ========
CREATE TABLE collaborations (
  id          TEXT PRIMARY KEY,
  playlist_id TEXT NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (playlist_id, user_id)
);
CREATE INDEX collaborations_playlist_idx ON collaborations(playlist_id);
CREATE INDEX collaborations_user_idx     ON collaborations(user_id);

-- =============== PLAYLIST ACTIVITIES (Wajib Tambahan 2) ===
CREATE TABLE playlist_song_activities (
  id          TEXT PRIMARY KEY,
  playlist_id TEXT NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  song_id     TEXT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action      TEXT NOT NULL CHECK (action IN ('add','delete')),
  time        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX psa_playlist_time_idx ON playlist_song_activities(playlist_id, time DESC);

-- =============== BANTUAN QUERY (opsional) =================
-- View untuk GET /playlists (menyertakan username owner)
CREATE OR REPLACE VIEW v_playlists_with_owner AS
SELECT p.id, p.name, u.username
FROM playlists p
JOIN users u ON u.id = p.owner;

-- View untuk GET /playlists/{id}/songs (header playlist + username)
CREATE OR REPLACE VIEW v_playlist_header AS
SELECT p.id, p.name, u.username
FROM playlists p
JOIN users u ON u.id = p.owner;

-- (Pengambilan list lagu per playlist tetap via JOIN ke playlist_songs + songs di layer aplikasi)
-- =============== USER ALBUM LIKES =========================
-- Menyimpan siapa (user_id) yang me-like album (album_id).
-- UNIQUE(user_id, album_id) mencegah like ganda pada album yang sama.
CREATE TABLE user_album_likes (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  album_id   TEXT NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, album_id)
);

-- Index untuk query umum (hitung like per album, list like per user)
CREATE INDEX ual_album_idx ON user_album_likes(album_id);
CREATE INDEX ual_user_idx  ON user_album_likes(user_id);

-- (Opsional) View untuk cepat ambil jumlah like per album
CREATE OR REPLACE VIEW v_album_like_counts AS
SELECT album_id, COUNT(*)::BIGINT AS likes
FROM user_album_likes
GROUP BY album_id;


