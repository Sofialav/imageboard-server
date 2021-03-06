const Image = require("./Image");
const express = require("express");
const auth = require("../auth/middleware");
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
router.post("/images", auth, async (req, res, next) => {
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
router.get("/users/:userId", async (req, res, next) => {
  try {
    const userImages = await Image.findAll({
      where: { userId: req.params.userId }
    });
    if (userImages) {
      return res.json(userImages);
    } else {
      return res.status(404).send("does not exist");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
