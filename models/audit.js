const db = require("../db");

/** Related functions for audits. */

class Audit {

  static async findAll(username) {

    const auditRes = await db.query(`
    SELECT
        record_id as "recordId",
        username,
        sku,
        previous_quantity_available AS "previousQuantity",
        new_quantity_available AS "newQuantity",
        change_date as "changeDate",
        reason
    FROM audit
    WHERE username = $1`,
    [username]);

    return auditRes.rows;
  }



}

module.exports = Audit;