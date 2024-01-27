import * as express from "express";
import authenticateKey from "../../utils/authenticate.js";

const api = express.Router();

import {info} from "./api/info.js"
import {location} from "./api/location.js";
import {apiKeyRequest} from "./api/api-key-request.js";

api.get(`/info`, info)

api.get(`/location/:city`,authenticateKey, location)

api.post(`/api-key-request`, apiKeyRequest)

api.get(`/api-key-request`, (req,res)=>{
  res.render('apiKeyReq')
})

export default api;