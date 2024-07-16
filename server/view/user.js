import express from 'express'
import { userController,luserController,updateUserController,deleteUserController,getUserController, getUserLeaveController } from '../controller/userController.js';
import verify from '../middleware/verify.js';

const user=express.Router();

user.post('/createuser',userController)


const luser=express.Router();

luser.post('/userlogin',luserController)

const uuser=express.Router();

uuser.put('/updateuser',updateUserController)

const duser=express.Router();

duser.delete('/deleteuser',deleteUserController)

const guser=express.Router();
guser.post('/getuser',getUserController)

const getUserLeave=express.Router();
getUserLeave.post('/getuserleavebyemail',getUserLeaveController)

export  {user,luser,uuser,duser,guser,getUserLeave}