"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, UnauthorizedError } = require("../expressError");
const Product = require("../models/inventory");
const { ensureLoggedIn } = require("../middleware/auth");

const productNewSchema = require("../schemas/productNew.json")

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

  const product = await Product.create({ ...req.body, username });
  return res.status(201).json({ product });
});


module.exports = router;