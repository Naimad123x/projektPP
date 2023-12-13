import EventEmitter from 'node:events';
import * as fs from "node:fs";
import * as path from "node:path";
import {format} from "date-fns";
import initEvents from "./initEvents.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class LoggerManager {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.logFIle;
  }
  checkLogDir(){
    const logDir = fs.existsSync(path.join(__dirname,"../logs/"))
    if(!logDir) {
      fs.mkdirSync(path.join(__dirname, "../logs/"))
      console.log(`Directory for logs has been created!`)
    }
    return this;
  }

  checkActualFile(){
    const formattedDate = format(new Date(), "dd-MM-yyyy");
    const logFile = fs.existsSync(path.join(__dirname,"../logs/"+formattedDate+".txt"))
    if(!logFile) {
      fs.writeFileSync(path.join(__dirname,"../logs/"+formattedDate+".txt"),
        `[date: ${formattedDate}]`,
        {encoding: "utf8"}
      )
    }
    this.logFile = path.join(__dirname,"../logs/"+formattedDate+".txt");
    return this;
  }
  newApiKey(email, apiKey, date){
    this.checkActualFile();
    fs.appendFileSync(this.logFile,
      `\n[${format(Date.now(), "HH:mm:ss")}] newApiKey: ${email}, ${apiKey}, ${date}`,
      {encoding: "utf8"}
    )
    this.eventEmitter.emit(`newApiKey`, email,apiKey,date)
  }

  emailSended(email, message){
    this.checkActualFile();
    this.eventEmitter.emit(`emailSend`, email,message)
  }

  /**
   *
   * @param {String} event
   * @param {(...args: any[]) => void} listener
   */
  on(event, listener){
    this.eventEmitter.on(event,listener)
  }

  initEvents(){
    initEvents();
  }
}