import express from 'express';
const app = express();
import bodyParser from 'body-parser'
import {join} from "path";
import router from './routes/main.js';
import api from './routes/api.js';
import * as path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

app
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))


  .use("/", router)
  .use("/api", api)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });