import * as fs from "node:fs";
import * as path from "node:path"
import {logger} from "../site/app.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function initEvents() {

  const eventFiles = fs.readdirSync(path.join(__dirname, `./loggerEvents`)).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const eventGet = await import(`./loggerEvents/${file}`);
    const event = eventGet.default;
    logger.on(event.name, (...args) => event.execute(...args));
  }
}
