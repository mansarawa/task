import {DataTypes, Sequelize} from 'sequelize'

export const createManagerTimeSchema=async(Sequelize)=>{
    const mTimeSheet=await Sequelize.define('managerSheet',{
        managername:{
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
        timetake:{
            type:DataTypes.FLOAT,
            // allowNull:false
        }
    })
    return mTimeSheet
}
