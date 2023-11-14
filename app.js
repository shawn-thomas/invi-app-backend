"use strict";

/** Express app for Invi. */

const express = require("express");
const cors = require("cors");
const app = express();

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customers")


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/customer", customerRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
  const err = new NotFoundError("Not Found");
  return next(err);
});

// Global error handler
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "test") {
    console.error(status, err.stack);
  }

  res.status(status).json({ error: { message, status } });
});

module.exports = app;
