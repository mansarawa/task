import { Sequelize } from  'sequelize';
import { createUserModel } from '../model/userSchema.js';
import { createAdminModel } from '../model/adminSchema.js';
import { createManagerModel } from '../model/managerSchema.js';
import {createMangerleaveSchema} from '../model/leaveSchema.js'
import { createUserleaveSchema } from '../model/userLeaveSchema.js';
import { createProjectSchema } from '../model/projectSchema.js';
import { createTeamModel } from '../model/teamSchema.js';
const sequelize = new Sequelize('postgres', 'mansa', '1884', {
    host: 'localhost',
    dialect: 'postgres' 
  });
  let adminModel=null
  let managerModel=null
  let userModel=null
  let mleaveModel=null
  let userLeaveModel=null
  let projectModel=null
  let teamModel=null
   const connection=async()=>{
    
    try {
        await sequelize.authenticate();
        adminModel=await createAdminModel(sequelize)
        managerModel=await createManagerModel(sequelize)
        userModel=await createUserModel(sequelize)
        mleaveModel=await createMangerleaveSchema(sequelize)
        userLeaveModel=await createUserleaveSchema(sequelize)
        projectModel=await createProjectSchema(sequelize)
        teamModel=await createTeamModel(sequelize)
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {connection,adminModel,userModel,managerModel,mleaveModel,userLeaveModel,projectModel}