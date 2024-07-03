import express from 'express'
import cors from 'cors'
import {connection} from './postgres/postgres.js'
import dotenv from 'dotenv'
import { adminModel, managerModel, userModel } from "./postgres/postgres.js";
import nodemailer from "nodemailer";

import {admin,ladmin,uadmin,dadmin, gadmin} from './view/admin.js';
import {user,luser,uuser,duser, guser} from './view/user.js';
import {manager,lmanager,umanager,dmanager, gmanager} from './view/manager.js';

const app=express();
dotenv.config();
connection();
app.use(express.json())
app.use(cors())

app.use('/',admin)
app.use('/',ladmin)
app.use('/',uadmin)
app.use('/',dadmin)
app.use('/',gadmin)
app.use('/',user)
app.use('/',luser)
app.use('/',uuser)
app.use('/',duser)
app.use('/',guser)
app.use('/',manager)
app.use('/',lmanager)
app.use('/',umanager)
app.use('/',dmanager)
app.use('/',gmanager)


export const resetController = async (req, res) => {
    const { email } = req.body;
    const resetUser = await userModel.findOne({ where: { email: email } });
    const resetManager = await managerModel.findOne({ where: { email: email } });
    const resetAdmin = await adminModel.findOne({ where: { email: email } });
    if (resetUser) {
        return res.json({ user: resetUser });
    } else if (resetManager) {
        return res.json({ manager: resetManager });
    } else {
        return res.json({ admin: resetAdmin });
    }
};

const sendMail = async (req, res) => {
    const { email } = req.body;
    const receiver = await userModel.findOne({ where: { email: email } }) || managerModel.findOne({ where: { email: email } }) ||adminModel.findOne({ where: { email: email } });

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



app.post("/reset", resetController);
app.post("/sendMail", sendMail);


app.listen((process.env.PORT),()=>{
    console.log("start")
})