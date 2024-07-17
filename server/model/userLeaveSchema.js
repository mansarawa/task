import { DataTypes, Sequelize } from "sequelize";

export const createUserleaveSchema=async(Sequelize)=>{
    const userleave=await Sequelize.define('UserLeave',{
        username:{
            type:DataTypes.STRING,
            allowNull:false

        },
        email:{
            type:DataTypes.STRING,
            allowNull:false

        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
              defaultValue: 'pending'

        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        managername:{
            type:DataTypes.STRING,
             allowNull:false
        }
    })
    return userleave
}