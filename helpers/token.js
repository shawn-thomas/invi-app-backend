"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT {username, isAdmin} from user data. */

function createToken(user) {
  // expiration for the token (1 day from now)
  const expiresIn = "1d";

  let payload = {
    username: user.username,
  };
  console.log("secret key ---------->", SECRET_KEY);
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
