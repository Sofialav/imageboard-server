const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");

const router = new Router();
// creating and sending user a token
router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    } else {
      const entity = await User.findOne({ where: { email: req.body.email } });
      if (!entity) {
        res.status(400).send({
          message: "User with that email does not exist"
        });
      }
      // 2. use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, entity.password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: entity.id })
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});
// secret endpoint
router.get("/secret-endpoint", (req, res) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: "Thanks for visiting the secret endpoint.",
        data
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});

module.exports = router;
