import { DataTypes } from "sequelize";

export const createUserModel=async(sequelize)=>{
    const userSchema=await  sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }, companyname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },password:
        {
            type:DataTypes.STRING,
            allowNull:false
        },
        salary:
        {
            type:DataTypes.INTEGER,
            allowNull:false
        }, role:
        {
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:'user'
        }
        ,managerId:
        {
            type:DataTypes.INTEGER,
          
        },managerName:
        {
            type:DataTypes.STRING,
            allowNull:false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },)
    return userSchema
}