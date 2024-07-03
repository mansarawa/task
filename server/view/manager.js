import verify from "../middleware/verify.js";
import { managerController,lmanagerController ,updateManagerController,deleteManagerController, getManagerController} from "../controller/managerController.js";
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
export  {manager,lmanager,umanager,dmanager,gmanager}