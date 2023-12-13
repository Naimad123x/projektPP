import transporter from "./transporter.js";
import {logger} from "../site/app.js";

export function messageBuilder(to, subject, text, html) {

  return {
    from: {
      name: 'weather forecast',
      address: process.env.EMAIL_USER
    },
    to: to,
    subject: subject,
    text: text,
    html: html
  };
}
export function sendMail(email, message){
  logger.emailSended(email, message)
  transporter.sendMail(message, (err) => {
    if (err) {
      console.log(err)
      return false;
    }
    return true;
  })
}