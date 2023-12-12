import * as express from "express";
const router = express.Router();

router.get(`/`, (req, res) =>{
  return res.render(`main`)
})

router.get(`/:city`, (req, res) =>{
  const {city} = req.params;
  return res.render(`city`)
})

export default router