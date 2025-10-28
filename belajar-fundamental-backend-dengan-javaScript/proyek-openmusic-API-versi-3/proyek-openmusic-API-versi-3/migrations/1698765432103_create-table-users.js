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
  pgm.createTable('users', {
    id: {
      type: 'TEXT',
      primaryKey: true,
    },
    username: {
      type: 'TEXT',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // Add constraint for username length
  pgm.addConstraint('users', 'users_username_check', {
    check: 'length(trim(username)) > 0',
  });

  // Add constraint for password
  pgm.addConstraint('users', 'users_password_check', {
    check: 'length(trim(password)) > 0',
  });

  // Add constraint for fullname
  pgm.addConstraint('users', 'users_fullname_check', {
    check: 'length(trim(fullname)) > 0',
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
};
