const passport = require("passport");
const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");

app.set("PORT", 5500 || process.env.PORT);

require("../models/main.model");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/static", express.static("public"));
app.use("/api", require("../routes/main.routes"));

require("./database.config");
require("./passport-jwt.config")(passport);

module.exports = app;
