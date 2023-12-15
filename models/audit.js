const db = require("../db");

/** Related functions for audits. */

class Audit {

  /** Find all audit records.
   *
   *
   * Returns [{ customerName, firstName, lastName, email, phone, address }, ...]
   */

  static async findAll(username) {

    const auditRes = await db.query(`
        SELECT
              record_id as "recordId",
              username,
              sku
              previos_quantity AS "previousQuantity",
              new_quantity AS "newQuantity",
              change_date as "changeDate"
        FROM audit
        WHERE username = $1`,
      [username]);

    return auditRes.rows;
  }



}

module.exports = Audit;