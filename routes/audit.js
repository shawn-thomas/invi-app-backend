"use strict";

/** Routes for audit records. */

const jsonschema = require("jsonschema");
const express = require("express");

const Audit = require("../models/audit");
const { ensureLoggedIn } = require("../middleware/auth");

const router = new express.Router();

/** GET /  =>
 *  { customers:
 *  [{ customerName, firstName, lastName, email, phone, address,...]}
 *
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const records = await Audit.findAll(username);

    return res.json({ records });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;