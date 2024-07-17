import { DataTypes, Sequelize } from "sequelize";

export const createProjectSchema=async(Sequelize)=>{
    const projectSchema=await Sequelize.define('Project',{
        projectname:{
            type:DataTypes.STRING,
            allowNull:false
        },manageremail:{
            type:DataTypes.STRING,
            allowNull:false
        },
        managername:{
            type:DataTypes.STRING,
            allowNull:false
        },
        desc:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deadline:{
            type:DataTypes.DATE
        },companyname:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    return projectSchema
}