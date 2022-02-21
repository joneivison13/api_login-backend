exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("lastname", 255).notNullable();
    table.string("document", 255).notNullable();
    table.string("rg_uri", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

exports.config = { transaction: false };
