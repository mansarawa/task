import express from 'express'
import { mLeaveController } from '../controller/leaveController.js';

const mleave=express.Router();

mleave.post('/applymanagerleave',mLeaveController)

export {mleave}