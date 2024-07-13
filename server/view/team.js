import express from 'express'
import { createTeamController, getUserProjectsController } from '../controller/teamController.js';

const team=express.Router();

team.post('/createteam',createTeamController)

const userProject=express.Router();
userProject.post('/userproject',getUserProjectsController)

export {team,userProject}