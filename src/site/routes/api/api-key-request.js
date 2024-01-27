import emailRegex from "email-regex-safe";
import {getApiKey, saveApiKey} from "../../../utils/storage.js";
import {format} from "date-fns";
import {messageBuilder, sendMail} from "../../../utils/mailer.js";
import crypto from "crypto";


export async function apiKeyRequest(req, res) {
  const {email} = req.body;
  if(!emailRegex({ exact: true }).test(email))
    return res.sendStatus(400);
  const hashedEmail = hashEmail(email);
  const accountExists = await getApiKey(hashedEmail);
  if(accountExists.length > 0){
    const date = accountExists[0].date;
    const formattedDate = format(new Date(Number(date)), "dd/MM/yyyy");
    return res.status(400).send({error: `The email provided already has an API KEY. Creation date: ${formattedDate}`});
  }else{

    const apiKey = genAPIKey();

    await saveApiKey(email,hashedEmail,apiKey,Date.now());

    await sendMail(email,
      messageBuilder(
        email,
        `API KEY for weather forecast`,
        `Your API KEY is:\n\n${apiKey}`,
        `<h3>Your API KEY is:</h3><br><br><h2 style="color:#8a9fe6">${apiKey}</h2>`
      )
    )

    return res.status(200).send({message: `API KEY was send to your email "${email}"`});

  }

}

const genAPIKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(64)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};

function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}