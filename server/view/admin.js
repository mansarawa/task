import express from 'express'
import { adminController,ladminController,updateAdminController,deleteAdminController, getAdminController, getMangerLeaveController, grantManagerLeaveController, denyManagerLeaveController } from '../controller/adminController.js';
import verify from '../middleware/verify.js';

const admin=express.Router();

admin.post('/createadmin',adminController)



const ladmin=express.Router();
ladmin.post('/adminlogin',ladminController)


const uadmin=express.Router();
uadmin.put('/updateadmin',updateAdminController)

const dadmin=express.Router();
dadmin.delete('/deleteadmin',deleteAdminController)

const gadmin=express.Router();
gadmin.get('/getadmin',getAdminController)

const leavemanager=express.Router();
 leavemanager.get('/getmangerleave',getMangerLeaveController)

const grantManager=express.Router();
grantManager.put('/grantmanagerleave',grantManagerLeaveController)

const denyManager=express.Router();
denyManager.put('/denymanagerleave',denyManagerLeaveController)
export {admin,ladmin,uadmin,dadmin,gadmin,leavemanager,grantManager,denyManager}