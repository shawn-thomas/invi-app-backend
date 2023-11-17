"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/users");
const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const { UnauthorizedError } = require("../expressError");

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login, admin/owner of account
 * otherwise, raise UnauthorizedError
 **/

router.get("/:username", ensureLoggedIn, async function (req, res, next) {

  const user = await User.get(req.params.username);
  const currentUser = res.locals.username;

  if (currentUser === user.username) {
    return res.json({ user });
  }

  throw new UnauthorizedError();
});

module.exports = router;