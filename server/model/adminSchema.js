import { DataTypes } from "sequelize";

export const createAdminModel=async(sequelize)=>{
    
const Admin = await sequelize.define(
    'Admin',
    {
      // Model attributes are defined here
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gst: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adminname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        isLowercase:true
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      role:
      {
          type:DataTypes.STRING,
          allowNull:true,
          defaultValue:'admin'
      }
    },
   
  );
  return Admin
}