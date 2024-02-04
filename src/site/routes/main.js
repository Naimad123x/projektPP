import * as express from "express";
const router = express.Router();
import {limiter} from "../../utils/limiter.js";

import {location} from "./main/location.js";
import {info} from "./main/info.js";

router.get(`/`, (req, res) =>{
  return res.render(`main`)
})

router.get('/reset', async (req, res) => {
    limiter.resetKey(req.ip);
    res.send('Rate limit is reset!')
})

router.get(`/location/:city`, location)

router.get(`/info/:city`, info)

router.get(`/info`, info)

export default router