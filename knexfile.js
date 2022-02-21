// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "app_signin",
      user: "root",
      password: "12345678",
    },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
