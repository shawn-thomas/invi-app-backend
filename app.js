"use strict";

/** Express app for Invi. */

const express = require("express");
const cors = require("cors");
const app = express();

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(authenticateJWT);

app.use("/auth", authRoutes);

// Test Route
// app.get('/test', async (req, res) => {
//   try {
//     const result = await db.query('SELECT NOW()');
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Database error:", error); // Log the error for debugging
//     res.status(500).json({ error: "Internal server error" }); // Send a generic error message
//   }
// });

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
