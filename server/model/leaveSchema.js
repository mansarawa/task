import { DataTypes, Sequelize } from "sequelize";

export const createMangerleaveSchema=async(Sequelize)=>{
    const leave=await Sequelize.define('Leave',{
        username:{
            type:DataTypes.STRING,
           

        },
        email:{
            type:DataTypes.STRING,
           

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
        companyname:{
            type:DataTypes.STRING,
             allowNull:false
        }
    })
    return leave
}