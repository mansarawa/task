import { projectModel } from "../postgres/postgres.js";

const createTeamController=async(req,res)=>{
    const {projectname,users}=req.body;
    try {
        const findProjectTeam=await projectModel.findAll({where:{projectname:projectname}})
        if(!findProjectTeam){
            const createTeam=await projectModel.create({projectname,users})
            return res.json({team:createTeam})
        }
    } catch (error) {
        console.log(error)
    }
}

export {createTeamController}