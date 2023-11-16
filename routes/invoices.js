"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const Invoice = require("../models/invoices");
const { ensureLoggedIn } = require("../middleware/auth");

const invoiceNewSchema = require("../schemas/invoiceNew.json");
const invoiceSearchSchema = require("../schemas/invoiceSearch.json");
const invoiceUpdateSchema = require("../schemas/invoiceUpdate.json");

const router = new express.Router();

/** POST / { invoice } =>  { invoice }
 *
 * invoice should be
 *  { invoice_id,
 *    customer_handle,
 *    invoice_date,
 *    total_amount,
 *    status,
 *    items: [{ sku, quantity, unit_price }] }
 *
 * Returns
 *  { invoiceId, customerHandle, invoiceDate, dateCreated, totalAmount, status, items }
 *
 * Authorization required: ensureLoggedIn
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;

    const validator = jsonschema.validate(
      req.body,
      invoiceNewSchema,
      { required: true }
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const invoice = await Invoice.create({ ...req.body, username });
    return res.status(201).json({ invoice });
  } catch (err) {
    return next(err);
  }
});

/** GET /:invoiceId => { invoice }
 *
 * Returns { invoiceId,
 *           customerHandle,
 *           invoiceDate,
 *           dateCreated,
 *           totalAmount,
 *           status,
 *           items }
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/:invoiceId", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const { invoiceId } = req.params;

    const invoice = await Invoice.get(invoiceId, username);
    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *  { invoices:
 *  [{ invoiceId, username, customerHandle, invoiceDate, dateCreated, totalAmount, status, items }, ...]}
 *
 * Can filter on provided search filters:
 * - status (only "pending" or "paid")
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const q = req.query;

    const validator = jsonschema.validate(
      q,
      invoiceSearchSchema,
      { required: true }
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const invoices = await Invoice.findAll(q, username);

    return res.json({ invoices });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /:invoiceId { fld1, fld2, ... } => { invoice }
 *
 * Patches invoice data.
 *
 * fields can be: { status }
 *
 * Returns { invoiceId,
 *           customerHandle,
 *           invoiceDate,
 *           dateCreated,
 *           totalAmount,
 *           status,
 *           items }
 *
 * Authorization required: ensureLoggedIn
 */

router.patch("/:invoiceId", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const { invoiceId } = req.params;

    const validator = jsonschema.validate(
      req.body,
      invoiceUpdateSchema,
      { required: true }
    );

    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const invoice = await Invoice.update(invoiceId, req.body, username);
    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /:invoiceId => { deleted: invoiceId }
 *
 * Authorization: ensureLoggedIn
 */

router.delete("/:invoiceId", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const { invoiceId } = req.params;

    await Invoice.remove(invoiceId, username);

    return res.json({ deleted: `Invoice ID: ${invoiceId}`});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
