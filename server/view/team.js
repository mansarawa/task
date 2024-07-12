import express from 'express'
import { createTeamController } from '../controller/teamController.js';

const team=express.Router();

team.post('/createteam',createTeamController)

export {team}