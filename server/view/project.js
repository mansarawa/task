import express from 'express'
import { createProjectController, getAdminProjectController, getManagerProjectController } from '../controller/projectController.js';

const project=express.Router();
project.post('/createproject',createProjectController)

const getAdminProject=express.Router();
getAdminProject.get('/getadminproject',getAdminProjectController)

const getManagerProject=express.Router();
getManagerProject.post('/getmanagerproject',getManagerProjectController)

export {project,getManagerProject,getAdminProject}