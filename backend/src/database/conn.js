const knex = require("knex");
const config = require("../../knexfile");

const ambient =
  process.env.NODE_ENV == "test" ? config.test : config.development;

const conn = knex(ambient);

module.exports = conn;
