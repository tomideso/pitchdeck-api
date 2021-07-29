import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { registerRoutes } from "./routes/routes";
import { DB_CONFIG } from "./config";
import { AppError, sendErrorProd } from "./ErrorHandler/AppError";
import * as mongoose from "mongoose";
const path = require("path");
const fileUpload = require("express-fileupload");

// const mongoose = require("mongoose");
(<any>mongoose).Promise = global.Promise;
const session = require("express-session");

const PORT = process.env.PORT || 8000;

const expressHandleBars = require("express-handlebars").create({
  defaultLayout: "layout",
  extname: "hbs",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
});

// connect mongodb

mongoose.connect(DB_CONFIG.mongoUrl, { useNewUrlParser: true }, (error) => {
  if (error) {
    throw "Error connecting to MongoDB";
  }

  const app = express();

  // view engine setup
  app.engine("hbs", expressHandleBars.engine);
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "views"));

  // Call midlewares
  app.use(cors());
  app.use(helmet());

  app.use(
    session({
      cookie: {
        secure: true,
        maxAge: 60000,
      },
      secret: process.env.SESSION_SECRET || "s(s:JDI:sddn[p[t",
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  // register express routes from defined application routes
  const routesV1 = registerRoutes(app);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(sendErrorProd);

  // start express server
  app.listen(PORT);

  console.log("Express server has started on port " + PORT);
});
