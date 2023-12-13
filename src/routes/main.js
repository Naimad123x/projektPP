import * as express from "express";
const router = express.Router();
import fetch from "node-fetch";
import 'dotenv/config'

router.get(`/`, (req, res) =>{
  return res.render(`main`)
})

router.get(`/location/:city`, async (req, res) => {
  const {city} = req.params;
  const {lang} = req.query || "en";

  await fetch(`/api/location/${city}?lang=${lang}&key=${process.env.API_KEY}`)
  return res.render(`city`)
})

export default router