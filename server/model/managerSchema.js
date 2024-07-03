import { DataTypes } from "sequelize";

export const createManagerModel=async(sequelize)=>{
    const manager=await sequelize.define('Manager',{
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
        role:
        {
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:'manager'
        }
        
    })
    return manager
}