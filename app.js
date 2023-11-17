"use strict";

/** Express app for Invi. */

const express = require("express");
const cors = require("cors");
const app = express();

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customers")
const invoiceRoutes = require("./routes/invoices")


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/customer", customerRoutes);
app.use("/invoice", invoiceRoutes);

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
