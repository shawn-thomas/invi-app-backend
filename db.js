"use strict";

/** Database setup for InviApp */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const databaseUri = getDatabaseUri();

const db = new Client({
  connectionString: databaseUri,
});

async function connectDb() {
  const { log, error } = require("console");
  try {
    await db.connect();
    log(`Connected to ${databaseUri}`);
  } catch (err) {
    error(`Couldn't connect to ${databaseUri}`, err.message);
    process.exit(1);
  }
}

connectDb();

module.exports = db;
