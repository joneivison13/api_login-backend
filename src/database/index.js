const knexData = require("../../knexfile");
const knex = require("knex")(knexData.development);

module.exports = knex;
