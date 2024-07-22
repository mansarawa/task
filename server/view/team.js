import express from 'express'
import { createTeamController, findProjectTeamController, getUserProjectsController, updateProjectTeamController } from '../controller/teamController.js';

const team=express.Router();

team.post('/createteam',createTeamController)

const userProject=express.Router();
userProject.post('/userproject',getUserProjectsController)

const findProjectTeam=express.Router();
findProjectTeam.post('/findprojectteam',findProjectTeamController)

const updateProjectTeam=express.Router();
updateProjectTeam.post('/updateprojectteam',updateProjectTeamController)

export {team,userProject,findProjectTeam,updateProjectTeam}