import { projectModel, teamModel } from "../postgres/postgres.js";
import Sequelize from 'sequelize';
const createTeamController = async (req, res) => {
  const { projectname, users } = req.body;

  try {
    const findProjectTeam = await projectModel.findOne({ where: { projectname: projectname } });
    if (findProjectTeam) {
      const createTeam = await teamModel.create({ projectname, users });
      return res.json({ team: createTeam });
    } else {
      return res.status(400).json({ error: "Project team already exists" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateProjectTeamController=async(req,res)=>{
    const {projectname,users}=req.body;
    try {
      const findTeam=await teamModel.findOne({where:{projectname:projectname}})
      if(findTeam)
      {
        const updateTeam=await teamModel.update({projectname,users})
        return res.status(200).json({updateTeam})
      }
    } catch (error) {
      
    }
}

const getUserProjectsController = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const teams = await teamModel.findAll({
      where: {
        users: {
          [Sequelize.Op.contains]: [username]
        }
      }
    });

    console.log("Found teams:", teams);

    if (teams.length === 0) {
      return res.status(404).json({ error: "No projects found for the user" });
    }

    const projectNames = teams.map(team => team.projectname);
    return res.json({ projects: projectNames });
  } catch (error) {
    console.log("Error fetching teams:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const findProjectTeamController=async(req,res)=>{
  const {projectname}=req.body
  const findTeam=await teamModel.findOne({where:{projectname:projectname}})
  if(findTeam){
    return res.status(200).json({success:true})
  }
  else{
   
      return res.status(200).json({success:false})
    
  }
}
export { createTeamController,getUserProjectsController,findProjectTeamController,updateProjectTeamController };
