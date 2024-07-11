import express from 'express'

import { userLeaveController } from '../controller/userLeaveController.js';

const uleave=express.Router();

uleave.post('/applyuserleave',userLeaveController)

export {uleave}