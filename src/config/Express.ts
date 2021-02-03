import express from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";

import router from "@routes/index";

class Express {
  public express: express.Application;
  public httpServer: http.Server;
  private applyMiddlewares = (): void => {
    this.express.use(
      "/images",
      express.static(path.join(__dirname, "..", "..", "public", "images"))
    );
    this.express.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, lang"
      );
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(router);
  };
  public init = (): void => {
    /**
     * Creating an express application
     */
    this.express = express();
    this.applyMiddlewares();
    /**
     *  Middlerware for extracting authToken
     */
    // this.express.use(auth);
    this.httpServer = http.createServer(this.express);
  };
}

export default Express;
