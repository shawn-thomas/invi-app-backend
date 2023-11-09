"use strict";

require("dotenv").config();

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql:///InviApp_test"
    : process.env.DATABASE_URL || "postgresql:///InviApp";
}

module.exports = { getDatabaseUri }; 
