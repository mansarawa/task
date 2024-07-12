import { DataTypes ,Sequelize} from "sequelize"

export const createTeamModel=async(Sequelize)=>{
    const teamSchema=await Sequelize.define('Team',{
        projectname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        users:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull:false
        }
})
    return teamSchema
}