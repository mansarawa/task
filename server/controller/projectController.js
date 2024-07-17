import { projectModel } from "../postgres/postgres.js";

const createProjectController = async (req, res) => {
    const { projectname, managername,manageremail, desc, deadline,companyname } = req.body;
    try {
        const findProject = await projectModel.findOne({ where: { projectname: projectname } })
        if (!findProject) {
            const createProject = await projectModel.create({ projectname, managername,manageremail, desc, deadline,companyname })
            return res.status(200).json({ project: createProject })
        }
        else {
            return res.json({ messsage: "Already exist" })
        }
    } catch (error) {
        console.log(error)
    }
}

const getManagerProjectController = async (req, res) => {
    try {
        const { manageremail } = req.body;
        console.log("hello")
       
         console.log("Received email project:", manageremail);
    
        if (!manageremail) {
          throw new Error('Email is required');
        }
    
        const project = await projectModel.findAll({ where: { manageremail: manageremail } });
        return res.json({ project });
      } catch (error) {
        console.error("Error in getManagerLeaveController:", error.message);
        return res.status(400).json({ error: error.message });
      }
}

const getAdminProjectController=async(req,res)=>{
    const {companyname}=req.body;
    try {
    const getProject=await projectModel.findAll({where:{companyname:companyname}});
    return res.status(200).json({projects:getProject})
} catch (error) {
    console.log(error)
}
}
export { createProjectController,getManagerProjectController,getAdminProjectController }