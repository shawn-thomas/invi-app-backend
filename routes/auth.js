"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/users");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");