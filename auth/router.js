const { Router } = require("express");
const { toJWT, toData } = require("./jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    } else {
      // normally we would check the password and find the correct user in the database
      res.send({
        jwt: toJWT({ userId: 1 })
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
