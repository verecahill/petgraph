import { adjectives, nouns } from "./words";
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

// console.log(process.env.SENDGRID_USERNAME);

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "ks10319@naver.com",
        to: address,
        subject: "Login Secret for PrismaGram😊",
        html: `Hello Your login secret is <strong>${secret}</strong>. <br/> Copy paste on the app/website`
    }
    return sendMail(email);
}

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET)