import express from 'express';
import 'dotenv/config'
const app = express();
import bodyParser from 'body-parser'
import {join} from "path";
import {limiter} from "../utils/limiter.js"
import router from './routes/main.js';
import api from './routes/api.js';
import * as path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import LoggerManager from "../utils/logger.js";

const logger = new LoggerManager();
logger.checkLogDir().initEvents();

const port = process.env.PORT;
app
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))
  .use(limiter)

  .use("/", router)
  .use("/api", api)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });

export {logger, app};