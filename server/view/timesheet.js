import express from 'express'
import { getalluserTimeSheetController, getmanagerTimeSheetController, getuserTimeSheetController, managerTimeSheetController, userTimeSheetController } from '../controller/timesheetcontroller.js'

const userTimeSheet=express.Router()
userTimeSheet.post('/usertimesheet',userTimeSheetController)

const oneUserTimeSheet=express.Router()
oneUserTimeSheet.post('/mytimesheet',getuserTimeSheetController)

const managerTimeSheet=express.Router()
managerTimeSheet.post('/managertimesheet',managerTimeSheetController)

const oneManagerTimeSheet=express.Router()
oneManagerTimeSheet.post('/myowntimesheet',getmanagerTimeSheetController)

const getAllUserTimeSheet=express.Router()
getAllUserTimeSheet.get('/allusertimesheet',getalluserTimeSheetController)

export {userTimeSheet,managerTimeSheet,oneUserTimeSheet,oneManagerTimeSheet,getAllUserTimeSheet}