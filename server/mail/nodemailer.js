import http from "http"
import nodemailer from "nodemailer";
import { adminModel, managerModel, userModel } from "../postgres/postgres.js";


const restMail = async (req, res) => {
    const { email } = req.body;
    const receiver = await userModel.findOne({ where: { email: email } }) || await  managerModel.findOne({ where: { email: email } }) ||await adminModel.findOne({ where: { email: email } });

    if (!receiver) {
        return res.status(404).json({ error: "User not found" });
    }

    const receiverPass = receiver.password;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: "bfcnesqpihgyykxo"
        }
    });

    const mailOptions = {
        from: "rawa@gmail.com",
        to: email,
        subject: "Password Reset Mail",
        text: `Hello, this is your password: ${receiverPass}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send email" });
        }
        return res.json({ success: "Email sent successfully!" });
    });
};

//------------create Admin----------------\\
const adminMail = async (email, password) => {
    // const { email,password } = req.body;
    const receiver =email

    if (!receiver) {
        return res.status(404).json({ error: "User not found" });
    }

    const receiverPass = password;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: "bfcnesqpihgyykxo"
        }
    });

    const mailOptions = {
        from: "rawa@gmail.com",
        to: email,
        subject: "Account Creation  Mail",
        text: `Hello,  this is your email ${receiver} and this is your : ${receiverPass} password`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send email" });
        }
        return res.json({ success: "Email sent successfully!" });
    });
};

//-------------create manager-------------\\
const managerMail = async (email, password) => {
    // const { email,password } = req.body;
    const receiver =email

    if (!receiver) {
        return res.status(404).json({ error: "User not found" });
    }

    const receiverPass = password;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: "bfcnesqpihgyykxo"
        }
    });

    const mailOptions = {
        from: "rawa@gmail.com",
        to: email,
        subject: "Account Creation  Mail",
        text: `Hello,  this is your email ${receiver} and this is your : ${receiverPass} password`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send email" });
        }
        return res.json({ success: "Email sent successfully!" });
    });
};

//-------------create user--------------\\
const userMail = async (email, password) => {
    // const { email,password } = req.body;
    const receiver =email

    if (!receiver) {
        return res.status(404).json({ error: "User not found" });
    }

    const receiverPass = password;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: "bfcnesqpihgyykxo"
        }
    });

    const mailOptions = {
        from: "rawa@gmail.com",
        to: email,
        subject: "Account Creation  Mail",
        text: `Hello,  this is your email ${receiver} and this is your : ${receiverPass} password`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send email" });
        }
        return res.json({ success: "Email sent successfully!" });
    });
};
export {restMail,adminMail,managerMail,userMail}