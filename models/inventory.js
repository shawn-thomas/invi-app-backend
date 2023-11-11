"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for Inventory. */

class Product {
  /** Create a product (from data), update db, return new product data.
   *
   * data should be:
   * { sku, username, productName, description (opt), price(opt), quantityAvailable(opt) }
   *
   * Throws NotFoundError if the sku does not exist.
   *
   * Returns:
   * { sku, productName, description, price, quantityAvailable }
   **/

  static async create({ sku, username, productName, description, price, quantityAvailable }) {
    const skuDupeCheck = await db.query(`
        SELECT sku
        FROM inventory
        WHERE sku = $1`, [sku]);

    // const username = getCurrentLoggedInUsername(req);

    if (skuDupeCheck.rows[0]) {
      throw new BadRequestError(`Duplicate SKU: ${sku}`);
    }

    const result = await db.query(`
        INSERT INTO inventory (sku,
                              username,
                              product_name,
                              description,
                              price,
                              quantity_available)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            sku,
            product_name as "productName",
            description,
            price,
            quantity_available as "quantityAvailable"`, [
      sku,
      username,
      productName,
      description,
      price,
      quantityAvailable
    ]);

    const product = result.rows[0];

    return product;
  }


  /** Update product data with `data`.
 *
 * This is a "partial update" --- only change fields with provided data.
 *
 * Data can include { sku, productName, description, price, quantityAvailable }
 *
 * Returns { sku, productName, description, price, quantityAvailable }
 *
 * Throws NotFoundError if not found.
 */

  static async update(sku, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        numEmployees: "product_name",
        quantityAvailable: "quantity_available",
      });

    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `
          UPDATE inventory
          SET ${setCols}
          WHERE sku = ${handleVarIdx}
          RETURNING
              sku,
              product_name AS "productName:,
              description,
              price,
              quantity_available AS "quantityAvailable"`;

    const result = await db.query(querySql, [...values, sku]);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No SKU: ${sku}`);

    return product;
  }


  /** Delete given product from inventory; returns undefined.
   *
   * Throws NotFoundError if sku not found.
   **/

  static async remove(sku) {
    const result = await db.query(`
        DELETE
        FROM inventory
        WHERE sku = $1
        RETURNING sku`, [sku]);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No SKU: ${sku}`);
  }

  static async get(sku, username) {
    const productRes = await db.query(`
          SELECT  sku,
                  product_name as "productName",
                  description,
                  price,
                  quantity_available AS "quantityAvailable"
          FROM inventory
          WHERE sku = $1 and username = $2`, [sku, username]);

    const product = productRes.rows[0];

    if (!product) throw new NotFoundError(`No SKU: ${sku}`);

    return product;
  }

}


module.exports = Product;