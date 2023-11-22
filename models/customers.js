"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { createHandle } = require("../helpers/createHandle");
const { cleanPhone } = require("../helpers/cleanPhone")

/** Related functions for customers. */

class Customer {
  /** Create a customer (from data), update db, return new company data.
   *
   * data should be { customerName, firstName, lastName, email, phone, address }
   *
   * Returns { customerName, handle, firstName, lastName, email, phone, address }
   *
   * */

  static async create({ customerName,
    username,
    firstName,
    lastName,
    email,
    phone,
    address }) {

    const phoneUnformatted = cleanPhone(phone);
    const handle = createHandle(customerName);
    const result = await db.query(`
        INSERT INTO customers (customer_name,
                              username,
                              handle,
                              first_name,
                              last_name,
                              email,
                              phone,
                              address)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING
            customer_name as "customerName",
            handle,
            first_name as "firstName",
            last_name as "lastName",
            email,
            phone,
            address`, [
      customerName,
      username,
      handle,
      firstName,
      lastName,
      email,
      phoneUnformatted,
      address
    ]);

    const customer = result.rows[0];

    return customer;
  }

  /** Find customer based on the provided customer handle and username.
   *
   * @param {string} handle - handle associated with the customer.
   * @param {string} username - username that created the customer record.
   *
   * Returns { customerName, handle, firstName, lastName, email, phone, address }
   */

  static async get(handle, username) {
    const customerRes = await db.query(`
          SELECT customer_name as "customerName",
                  handle,
                  first_name as "firstName",
                  last_name as "lastName",
                  email,
                  phone,
                  address
          FROM customers
          WHERE handle = $1 AND username = $2`, [handle, username]);

    const customer = customerRes.rows[0];

    if (!customer) throw new NotFoundError(`No customers found for handle: ${handle}`);

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
    const { customerNameLike, firstNameLike, lastNameLike, phoneLike } = searchFilters;
    let vals = [];

    let whereParts = [];

    if (customerNameLike) {
      vals.push(`%${customerNameLike}%`);
      whereParts.push(`customer_name ILIKE $${vals.length}`);
    }

    if (firstNameLike) {
      vals.push(`%${firstNameLike}%`);
      whereParts.push(`first_name ILIKE $${vals.length}`);
    }

    if (lastNameLike) {
      vals.push(`%${lastNameLike}%`);
      whereParts.push(`last_name ILIKE $${vals.length}`);
    }

    if (phoneLike) {
      vals.push(`%${phoneLike}%`);
      whereParts.push(`phone ILIKE $${vals.length}`);
    }

    vals.push(username);
    whereParts.push(`username = $${vals.length}`);

    const where = (whereParts.length > 0) ? "WHERE " + whereParts.join(" AND ") : "";

    const customersRes = await db.query(`
        SELECT customer_name as "customerName",
               first_name as "firstName",
               last_name as "lastName",
               email,
               phone,
               address
        FROM customers ${where}`, vals);

    return customersRes.rows;
  }


  /** Update customer data with `data`.
   *
   * This is a "partial update" --- only change fields with provided data.
   *
   * Data can include { customerName, firstName, lastName, email, phone, address }
   *
   * Returns { customerName, handle, firstName, lastName, email, phone, address }
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data, username) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        customerName: "customer_name",
        firstName: "first_name",
        lastName: "last_name",
      });

    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `
          UPDATE customers
          SET ${setCols}
          WHERE handle = ${handleVarIdx} and username = $${values.length + 2}
          RETURNING
                  customer_name as "customerName",
                  handle,
                  first_name as "firstName",
                  last_name as "lastName",
                  email,
                  phone,
                  address`;

    const result = await db.query(querySql, [...values, handle, username]);
    const customer = result.rows[0];

    if (!customer) throw new NotFoundError(`No customer found for handle: ${handle}`);

    // update handle
    customer['handle'] = createHandle(customer['customerName']);

    return customer;
  }

  /** Delete customer.
   *
   * Throws NotFoundError if customer not found.
   **/

  static async remove(handle, username) {
    const result = await db.query(`
        DELETE
        FROM customers
        WHERE username = $1 AND handle = $2
        RETURNING customer_name as "customerName"`,
    [username, handle]);

    const customer = result.rows[0];

    if (!customer) throw new NotFoundError(`No customer found for handle: ${handle}`)
  }


}

module.exports = Customer;