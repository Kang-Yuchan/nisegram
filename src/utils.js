import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env")});
import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";


export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSecretMail = (adress, secret) => ({
    from: "yuchan@nisegram.com",
    to: adress,
    subject: "🔑 Login Secret for Nisegram 🔑",
    html: `Hey! Your login secret it ${secret}.<br/>Copy paste on the app/website to login`
})
sgMail.send(sendSecretMail("rkddbcks123@naver.com", "123"));
