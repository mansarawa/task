import verify from "../middleware/verify.js";
import { managerController,lmanagerController ,updateManagerController,deleteManagerController, getManagerController, getUserLeaveController, grantUserLeaveController, denyUserLeaveController, getManagerLeaveController} from "../controller/managerController.js";
import express from 'express'

const manager=express.Router();

manager.post('/createmanager',managerController)

const lmanager=express.Router();
lmanager.post('/managerlogin',lmanagerController)

const umanager=express.Router();
umanager.put('/updatemanager',updateManagerController)

const dmanager=express.Router();
dmanager.delete('/deletemanager',deleteManagerController)

const gmanager=express.Router();
gmanager.get('/getmanager',getManagerController)

const getManagerLeave=express.Router();
getManagerLeave.post('/getmanagerleavebyemail',getManagerLeaveController)

const leaveUser=express.Router();
leaveUser.get('/getuserleave',getUserLeaveController)

const grantUser=express.Router();
grantUser.put('/grantuserleave',grantUserLeaveController)

const denyUser=express.Router();
denyUser.put('/denyuserleave',denyUserLeaveController)

export  {manager,lmanager,umanager,dmanager,gmanager,grantUser,denyUser,leaveUser,getManagerLeave}