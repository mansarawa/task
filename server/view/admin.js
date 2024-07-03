import express from 'express'
import { adminController,ladminController,updateAdminController,deleteAdminController, getAdminController } from '../controller/adminController.js';
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
export {admin,ladmin,uadmin,dadmin,gadmin}