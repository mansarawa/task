import {DataTypes, Sequelize} from 'sequelize'

export const createUserTimeSchema=async(Sequelize)=>{
    const uTimeSheet=await Sequelize.define('userSheet',{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        projectname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        desc:{
            type:DataTypes.STRING,
            allowNull:false
        },
        timetaken:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        managername:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return uTimeSheet
}