import pool from "./conn.js";
import {logger} from "../site/app.js";
export async function getApiKey(email) {
  return await new Promise(async function (resolve, reject) {
    pool.query("SELECT * FROM `api_keys` WHERE email = ?",
      [email],
      function (err, rows) {
        if (err)
          return reject(err);
        return resolve(rows);
      });
  })
}

export async function findApiKey(key) {
  return await new Promise(async function (resolve, reject) {
    pool.query("SELECT * FROM `api_keys` WHERE `key` = ?",
      [key],
      function (err, rows) {
        if (err)
          return reject(err);
        return resolve(rows);
      });
  })
}

export async function saveApiKey(email, hashedEmail, apiKey, date) {
  logger.newApiKey(email, apiKey, date)
  return await new Promise(async function (resolve, reject) {
    pool.query("INSERT INTO `api_keys` (`email`,`key`,`date`) VALUES (?,?,?)",
      [hashedEmail,apiKey,date],
      function (err, rows) {
        if (err)
          return reject(err);
        return resolve(rows);
      });
  })
}