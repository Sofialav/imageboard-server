const Sequelize = require("sequelize");

const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:image@localhost:5432/postgres";
const db = new Sequelize(dbUrl);

db.sync()
  .then(() => console.log("Data base updated successfully"))
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  });

module.exports = db;
