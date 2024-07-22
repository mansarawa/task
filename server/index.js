import express from 'express'
import cors from 'cors'
import {connection} from './postgres/postgres.js'
import dotenv from 'dotenv'
import { adminModel, managerModel, userModel } from "./postgres/postgres.js";
import nodemailer from "nodemailer";

import {admin,ladmin,uadmin,dadmin, gadmin, leavemanager, grantManager, denyManager} from './view/admin.js';
import {user,luser,uuser,duser, guser, getUserLeave} from './view/user.js';
import {manager,lmanager,umanager,dmanager,gmanager,grantUser,denyUser,leaveUser, getManagerLeave} from './view/manager.js';
import { mleave } from './view/leave.js';
import { uleave } from './view/userleave.js';
import { getAdminProject, getManagerProject, project } from './view/project.js';
import { findProjectTeam, team, updateProjectTeam, userProject } from './view/team.js';
import { adminManagerSheet, getAllUserTimeSheet, getUserSheet, managerTimeSheet, oneManagerTimeSheet, oneUserTimeSheet, userTimeSheet } from './view/timesheet.js';
import { restMail } from './mail/nodemailer.js';


const app=express();
dotenv.config();
connection();
app.use(express.json())
app.use(cors());

app.use('/',admin)
app.use('/',ladmin)
app.use('/',uadmin)
app.use('/',dadmin)
app.use('/',gadmin)
app.use('/',getAdminProject)
app.use('/',leavemanager)
app.use('/',grantManager)
app.use('/',denyManager)
app.use('/',user)
app.use('/',luser)
app.use('/',uuser)
app.use('/',duser)
app.use('/',guser)
app.use('/',oneUserTimeSheet)
app.use('/',getUserSheet)
app.use('/',userTimeSheet)
app.use('/',userProject)
app.use('/',getUserLeave)
app.use('/',uleave)
app.use('/',manager)
app.use('/',lmanager)
app.use('/',umanager)
app.use('/',dmanager)
app.use('/',adminManagerSheet)
app.use('/',oneManagerTimeSheet)
app.use('',getAllUserTimeSheet)
app.use('/',managerTimeSheet)
app.use('/',team)
app.use('',findProjectTeam)
app.use('/',updateProjectTeam)
app.use('/',gmanager)
app.use('/',project)
app.use('/',getManagerProject)
app.use('/',getManagerLeave)
app.use('/',mleave)
app.use('/',leaveUser)
app.use('/',grantUser)
app.use('/',denyUser)
  


app.post("/sendMail", restMail);


app.listen((process.env.PORT),()=>{
    console.log("start")
})