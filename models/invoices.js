"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for invoices. */

class Invoice {
  /** Create an invoice (from data), update db, return new invoice data.
   *
   * data should be { username,
   *                  invoice_id,
   *                  customer_handle,
   *                  invoice_date,
   *                  total_amount,
   *                  status,
   *                  items: [{ sku, quantity, unit_price }] }
   *
   * Returns { invoiceId,
   *           customerHandle,
   *           invoiceDate,
   *           dateCreated,
   *           totalAmount,
   *           status,
   *           items }
   *
   * */

  static async create({ invoiceId,
                        username,
                        customerHandle,
                        invoiceDate,
                        totalAmount,
                        status,
                        items }) {
    const existingInvoice = await db.query(
      `SELECT invoice_id FROM invoices WHERE username = $1 AND invoice_id = $2`,
      [username, invoiceId]
    );

    if (existingInvoice.rows.length > 0) {
      throw new BadRequestError(`Invoice with ID ${invoiceId} already exists for user ${username}`);
    }

    const invoiceRes = await db.query(`
      INSERT INTO invoices (invoice_id,
                            username,
                            customer_handle,
                            invoice_date,
                            total_amount,
                            status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        invoice_id AS "invoiceId",
        customer_handle AS "customerHandle",
        invoice_date AS "invoiceDate",
        date_created AS "dateCreated",
        total_amount AS "totalAmount",
        status`,
      [invoiceId, username, customerHandle, invoiceDate, totalAmount, status]);

    const invoice = invoiceRes.rows[0];


    const itemPromises = items.map(async (item) => {
      const itemRes = await db.query(`
        INSERT INTO invoice_items (invoice_id,
                                  username,
                                  sku,
                                  quantity,
                                  unit_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
            item_id AS "itemId",
            sku,
            quantity,
            unit_price AS "unitPrice"`,
        [invoice.invoiceId, username, item.sku, item.quantity, item.unitPrice]);

      return itemRes.rows[0];
    });

    invoice.items = await Promise.all(itemPromises);

    return invoice;
  }

  /** Get an invoice by ID and username.
   *
   * Returns { invoiceId,
   *           username,
   *           customerHandle,
   *           invoiceDate,
   *           dateCreated,
   *           totalAmount,
   *           status,
   *           items }
   *
   * where items is an array of { itemId, sku, quantity, unitPrice }
   */

  static async get(invoiceId, username) {
    const invoiceRes = await db.query(`
      SELECT invoices.invoice_id AS "invoiceId",
            invoices.username,
            invoices.customer_handle AS "customerHandle",
            invoices.invoice_date AS "invoiceDate",
            invoices.date_created AS "dateCreated",
            invoices.total_amount AS "totalAmount",
            invoices.status,
            invoice_items.item_id AS "itemId",
            invoice_items.sku,
            invoice_items.quantity,
            invoice_items.unit_price AS "unitPrice"
      FROM invoices
      JOIN
        invoice_items ON invoices.invoice_id = invoice_items.invoice_id AND
        invoices.username = invoice_items.username
      WHERE invoices.invoice_id = $1 AND invoices.username = $2`,
      [invoiceId, username]);

    if (invoiceRes.rows.length > 0) {
      const { invoiceId,
              customerHandle,
              invoiceDate,
              dateCreated,
              totalAmount,
              status } = invoiceRes.rows[0];

      const items = invoiceRes.rows.map(row => ({
        itemId: row.itemId,
        sku: row.sku,
        quantity: row.quantity,
        unitPrice: row.unitPrice,
      }));

      return { invoiceId,
               customerHandle,
               invoiceDate,
               dateCreated,
               totalAmount,
               status,
               items };
    } else {
      throw new Error(`Invoice ${invoiceId} not found.`);
    }
  }


  /** Find all invoices (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - status
   *
   * Returns [{ invoiceId,
   *            customerHandle,
   *            invoiceDate,
   *            dateCreated,
   *            totalAmount,
   *            status,
   *            items }, ...]
   * where items is an array of { itemId, sku, quantity, unitPrice }
   */

  static async findAll(searchFilters = {}, username) {
    const { status } = searchFilters;
    let vals = [];

    let whereParts = [];

    if (status) {
      vals.push(status);
      whereParts.push(`status = $${vals.length}`);
    }

    vals.push(username);
    whereParts.push(`invoices.username = $${vals.length}`);

    const where = (whereParts.length > 0) ? "WHERE " + whereParts.join(" AND ") : "";

    const invoicesRes = await db.query(`
      SELECT invoices.invoice_id AS "invoiceId",
            invoices.username,
            invoices.customer_handle AS "customerHandle",
            invoices.invoice_date AS "invoiceDate",
            invoices.date_created AS "dateCreated",
            invoices.total_amount AS "totalAmount",
            invoices.status,
            invoice_items.item_id AS "itemId",
            invoice_items.sku,
            invoice_items.quantity,
            invoice_items.unit_price AS "unitPrice"
      FROM invoices
      JOIN
          invoice_items ON invoices.invoice_id = invoice_items.invoice_id AND
          invoices.username = invoice_items.username
      ${where}
      ORDER BY invoices.invoice_id`, vals);

    const invoices = [];

    let currentInvoiceId = null;
    let currentInvoice = null;

    invoicesRes.rows.forEach(row => {
      if (row.invoiceId !== currentInvoiceId) {
        if (currentInvoice) {
          invoices.push(currentInvoice);
        }

        currentInvoiceId = row.invoiceId;
        currentInvoice = {
          invoiceId: row.invoiceId,
          username: row.username,
          customerHandle: row.customerHandle,
          invoiceDate: row.invoiceDate,
          dateCreated: row.dateCreated,
          totalAmount: row.totalAmount,
          status: row.status,
          items: [{
            itemId: row.itemId,
            sku: row.sku,
            quantity: row.quantity,
            unitPrice: row.unitPrice,
          }],
        };
      } else {
        currentInvoice.items.push({
          itemId: row.itemId,
          sku: row.sku,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
        });
      }
    });

    if (currentInvoice) {
      invoices.push(currentInvoice);
    }

    return invoices;
  }


  /** Update given invoice with data.
   *
   * This is a "partial update" --- only changes fields that are provided in data.
   *
   * Data can include { status }
   *
   * Returns
   * { invoiceId, customerHandle, invoiceDate, dateCreated, totalAmount, status }
   *
   * Throws NotFoundError if not found.
   */

  static async update(invoiceId, data, username) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      status: "status"
    });

    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `
      UPDATE invoices
      SET ${setCols}
      WHERE invoice_id = ${handleVarIdx} AND username = $${values.length + 2}
      RETURNING
        invoice_id AS "invoiceId",
        customer_handle AS "customerHandle",
        invoice_date AS "invoiceDate",
        date_created AS "dateCreated",
        total_amount AS "totalAmount",
        status`;

    const result = await db.query(querySql, [...values, invoiceId, username]);
    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice found for ID: ${invoiceId}`);

    return invoice;
  }


  /** Delete given invoice from the database; returns undefined.
   *
   * Throws NotFoundError if invoice not found.
   */

  static async remove(invoiceId, username) {
    const result = await db.query(`
      DELETE FROM invoices
      WHERE invoice_id = $1 AND username = $2
      RETURNING invoice_id AS "invoiceId"`, [invoiceId, username]);

    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice found for ID: ${invoiceId}`);
  }
}

module.exports = Invoice;
8