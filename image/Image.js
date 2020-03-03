const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Image = db.define("image", {
  url: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false }
});
Image.belongsTo(User);
module.exports = Image;
