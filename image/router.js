const Image = require("./Image");
const express = require("express");
// const { Router } = require("express");
// const router = new Router();
const router = express.Router();

router.get("/images", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.status(201).json(images);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
