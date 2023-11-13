"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for customers. */

class Customer {
  /** Create a customer (from data), update db, return new company data.
   *
   * data should be { customerName, firstName, lastName, email, phone, address }
   *
   * Returns { customerName, firstName, lastName, email, phone, address }
   *
   * */

  static async create({ customerName,
                        firstName,
                        lastName,
                        email,
                        phone,
                        address }) {

    const result = await db.query(`
        INSERT INTO customers (customerName,
                              firstName,
                              lastName,
                              email,
                              phone,
                              address)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            customer_name as "customerName",
            first_name as "firstName",
            last_name as "lastName",
            email,
            phone,
            address`, [
      customerName,
      firstName,
      lastName,
      email,
      phone,
      address
    ]);

    const customer = result.rows[0];

    return customer;
  }

/** Find all customers (optional filter on searchFilters).
 *
 * searchFilters (all optional):
 * - customerNameLike
 * - firstNameLike
 * - lastNameLike
 *
 * - customerNameLike (will find case-insensitive, partial matches)
 *
 * Returns [{ customerName, firstName, lastName, email, phone, address }, ...]
 */

  static async findAll(searchFilters = {}, username) {
    const { customerNameLike, firstNameLike, lastNameLike } = searchFilters;
    let vals = []; // Initialize vals here

    let whereParts = [];

    if (customerNameLike) {
        vals.push(`%${nameLike}%`);
        whereParts.push(`customer_name ILIKE $${vals.length}`);
    }

    if (firstNameLike) {
        vals.push(`%${nameLike}%`);
        whereParts.push(`first_name ILIKE $${vals.length}`);
    }

    if (lastNameLike) {
        vals.push(`%${nameLike}%`);
        whereParts.push(`last_name ILIKE $${vals.length}`);
    }

    vals.push(username);
    whereParts.push(`username = $${vals.length}`);

    const where = (whereParts.length > 0) ? "WHERE " + whereParts.join(" AND ") : "";

    const customersRes = await db.query(`
        SELECT customer_name as customerName,
               first_name as firstName,
               last_name as lastName,
               email,
               phone,
               address
        FROM customers ${where}`
      );

    return customersRes.rows;
  }

/** Update customer data with `data`.
 *
 * This is a "partial update" --- only change fields with provided data.
 *
 * Data can include { firstName, lastName, email, phone, address }
 *
 * Returns { customerName, firstName, lastName, email, phone, address }
 *
 * Throws NotFoundError if not found.
 */

  static async update(customerName, data, username) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "firstName",
        lastName: "lastName",
      });

    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `
          UPDATE inventory
          SET ${setCols}
          WHERE customerName = ${handleVarIdx} and username = $${values.length + 2}
          RETURNING
                  customer_name as customerName,
                  first_name as firstName,
                  last_name as lastName,
                  email,
                  phone,
                  address`;

    const result = await db.query(querySql, [...values, customerName, username]);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No customer: ${customerName}`);

    return product;
  }



}

module.exports = Company;