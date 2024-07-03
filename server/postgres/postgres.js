import { Sequelize } from  'sequelize';
import { createUserModel } from '../model/userSchema.js';
import { createAdminModel } from '../model/adminSchema.js';
import { createManagerModel } from '../model/managerSchema.js';
const sequelize = new Sequelize('postgres', 'mansa', '1884', {
    host: 'localhost',
    dialect: 'postgres' 
  });
  let adminModel=null
  let managerModel=null
  let userModel=null
   const connection=async()=>{
    
    try {
        await sequelize.authenticate();
        adminModel=await createAdminModel(sequelize)
        managerModel=await createManagerModel(sequelize)
        userModel=await createUserModel(sequelize)
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {connection,adminModel,userModel,managerModel}