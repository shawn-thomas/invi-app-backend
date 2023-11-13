"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, UnauthorizedError } = require("../expressError");
const Product = require("../models/inventory");
const { ensureLoggedIn } = require("../middleware/auth");

const productNewSchema = require("../schemas/productNew.json")
const productSearchSchema = require("../schemas/productSearch.json")
const productUpdateSchema = require("../schemas/productUpdate.json")

const router = new express.Router();

/** POST / { product } =>  { product }
 *
 * product should be
 *  { sku, username, productName, description, price, quantityAvailable }
 *
 * Returns
 *  { sku, productName, description, price, quantityAvailable }
 *
 * Authorization required: ensureLoggedIn
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;

  const validator = jsonschema.validate(
    req.body,
    productNewSchema,
    {required: true}
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const capitalizedSku = req.body['sku'].toUpperCase();
  req.body.sku = capitalizedSku;

  const product = await Product.create({ ...req.body, username });
  return res.status(201).json({ product });
});

/** GET /  =>
 *  { inventory:
 *  [{ sku, username, productName, description, price, quantityAvailable,...]}
 *
 * Can filter on provided search filters:
 * - nameLike
 * - maxPrice
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const username = res.locals.username;
    const q = req.query;
    if (q.maxPrice !== undefined) q.maxPrice = +q.maxPrice;

    const validator = jsonschema.validate(
      q,
      productSearchSchema,
      { required: true }
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const products = await Product.findAll(q, username);

    return res.json({ products });
  } catch (err) {
    return next(err);
  }
});

/** GET /[sku] => { product }
 *
 *  Product is { sku, productName, description, price, quantityAvailable}
 *
 * Authorization required: ensureLoggedIn
 */

router.get("/:sku", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;
  const sku = req.params.sku.toUpperCase();

  const product = await Product.get(sku, username);
  return res.json({ product });
});


/** PATCH /[sku] { fld1, fld2, ... } => { product }
 *
 * Patches product data.
 *
 * fields can be: { productName, description, price, quantityAvailable}
 *
 * Returns { sku, productName, description, price, quantityAvailable}
 *
 * Authorization required: ensureLoggedIn
 */

router.patch("/:sku", ensureLoggedIn, async function (req, res, next) {
  const username = res.locals.username;
  const sku = req.params.sku.toUpperCase();

  const validator = jsonschema.validate(
    req.body,
    productUpdateSchema,
    {required: true}
  );

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const product = await Product.update(sku, req.body, username);
  return res.json({ product })

})


module.exports = router;