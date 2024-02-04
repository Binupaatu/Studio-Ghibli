const Sequelize = require("sequelize");
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = require("./index");
console.log("Hii=====>"+DB_PASSWORD)
const dB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = dB;
