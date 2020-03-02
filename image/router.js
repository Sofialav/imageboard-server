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
router.post("/images", async (req, res, next) => {
  try {
    if (!req.body.url || !req.body.title) {
      return res.status(400).send("wrong request!");
    } else {
      const imagePost = await Image.create(req.body);
      return res.json(imagePost);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
