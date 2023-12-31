"use strict";

/** Routes for customers. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, UnauthorizedError } = require("../expressError");
const Customer = require("../models/customers");
const { ensureLoggedIn } = require("../middleware/auth");

const customerNewSchema = require("../schemas/customerNew.json");
const customerSearchSchema = require("../schemas/customerSearch.json");
const customerUpdateSchema = require("../schemas/customerUpdate.json");

const router = new express.Router();

/** POST / { customer } => { customer }
 *
 * customer should be
 * { customerName, firstName, lastName, email, phone, address }
 *
 * Returns { customerName, handle, firstName, lastName, email, phone, address }
 *
 * Authorization required: ensureLoggedIn
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;

  const validator = jsonschema.validate(
    req.body,
    customerNewSchema,
    { required: true }
  );

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const customer = await Customer.create({ ...req.body, username });
  return res.status(201).json({ customer });
});


/** GET /  =>
 *  { customers:
 *  [{ customerName, firstName, lastName, email, phone, address,...]}
 *
 * Can filter on provided search filters:
 * - customerNameLike
 * - firstNameLike
 * - lastNameLike
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const q = req.query;

    const validator = jsonschema.validate(
      q,
      customerSearchSchema,
      { required: true }
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const customers = await Customer.findAll(q, username);

    return res.json({ customers });
  } catch (err) {
    return next(err);
  }
});


/** GET /[handle] => { customer }
 *
 * Returns { customerName, firstName, lastName, email, phone, address }
 *
 * authorization required: ensureLoggedIn
 */

router.get("/:handle", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;
  const handle = req.params.handle.toLowerCase();

  const customer = await Customer.get(handle, username);
  return res.json({ customer });
});


/** PATCH /[handle] { fld1, fld2, ... } => { customer }
 *
 * Patches customer data.
 *
 * fields can be: { customerName, firstName, lastName, email, phone, address }
 *
 * Returns { customerName, handle, firstName, lastName, email, phone, address }
 *
 * Authorization required: ensureLoggedIn
 */

router.patch("/:handle", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;
  const handle = req.params.handle.toLowerCase();

  const validator = jsonschema.validate(
    req.body,
    customerUpdateSchema,
    { required: true }
  );

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const customer = await Customer.update(handle, req.body, username);
  return res.json({ customer });
});


/** DELETE /[handle] => { deleted: handle }
 *
 * Authorization: ensureLoggedIn
 */

router.delete("/:handle", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;
  const handle = req.params.handle.toLowerCase();

  await Customer.remove(handle, username);

  return res.json({ deleted: handle })
})

module.exports = router;