import {findApiKey} from "./storage.js";

export default async function authenticateKey(req, res, next) {
  const {key} = req.query;
  const foundedKey = await findApiKey(key ?? "none");
  if (!key || key !== process.env.API_KEY && foundedKey.length < 1)
    return res.status(403).send({error: {code: 403, message: "You not allowed."}});
  next();
}