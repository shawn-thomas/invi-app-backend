"use strict";

require("dotenv").config();

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql:///InviApp_test"
    : process.env.DATABASE_URL || "postgresql:///InviApp";
}

const SECRET_KEY = process.env.SECRET_KEY || "secret"

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  BCRYPT_WORK_FACTOR,
  getDatabaseUri
};
