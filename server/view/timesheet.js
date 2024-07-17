import express from 'express'
import { adminManagerSheetController, getalluserTimeSheetController, getmanagerTimeSheetController, getuserTimeSheetController, managerTimeSheetController, myUserSheetContoller, userTimeSheetController } from '../controller/timesheetcontroller.js'

const userTimeSheet=express.Router()
userTimeSheet.post('/usertimesheet',userTimeSheetController)

const oneUserTimeSheet=express.Router()
oneUserTimeSheet.post('/mytimesheet',getuserTimeSheetController)

const managerTimeSheet=express.Router()
managerTimeSheet.post('/managertimesheet',managerTimeSheetController)

const oneManagerTimeSheet=express.Router()
oneManagerTimeSheet.post('/myowntimesheet',getmanagerTimeSheetController)

const adminManagerSheet=express.Router()
adminManagerSheet.post('/mymanagersheet',adminManagerSheetController)

const getAllUserTimeSheet=express.Router()
getAllUserTimeSheet.get('/allusertimesheet',getalluserTimeSheetController)

const getUserSheet=express.Router();
getUserSheet.post('/myusersheet',myUserSheetContoller)

export {userTimeSheet,managerTimeSheet,oneUserTimeSheet,oneManagerTimeSheet,getAllUserTimeSheet,getUserSheet,adminManagerSheet}