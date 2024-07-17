import { managerSheet, userSheet } from "../postgres/postgres.js";
import { Op } from 'sequelize';

const userTimeSheetController = async (req, res) => {
    const { projectname, username, title, desc, timetaken,managername } = req.body;
    try {
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSheet = await userSheet.findOne({
            where: {
                projectname:projectname,
                username: username,
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        if (existingSheet) {
            return res.status(200).json({ message: "Timesheet entry for today already exists." ,success:false});
        }

    
        const createSheet = await userSheet.create(req.body);
        if (createSheet) {
            return res.status(200).json({ sheet: createSheet ,success:true});
        }
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const getuserTimeSheetController = async (req, res) => {
    const {  username } = req.body;
    try {

        const existingSheet = await userSheet.findAll({where: {username: username }
        });

        if (existingSheet) {
            return res.status(200).json({ existingSheet });
        }    
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const managerTimeSheetController = async (req, res) => {
    const { projectname, managername,companyname, title, desc, timetaken } = req.body;
    try {
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSheet = await managerSheet.findOne({
            where: {
                projectname:projectname,
                managername: managername,
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });
        if (existingSheet) {
            return res.status(200).json({ message: "Timesheet entry for today already exists." ,success:false});
        }
        const createSheet = await managerSheet.create(req.body);
        if (createSheet) {
            return res.status(200).json({ sheet: createSheet,success:true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const getmanagerTimeSheetController = async (req, res) => {
    const {  managername } = req.body;
    try {

        const existingSheet = await managerSheet.findAll({where: {managername:managername }
        });

        if (existingSheet) {
            return res.status(200).json({ existingSheet });
        }    
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const adminManagerSheetController=async(req,res)=>{
    const {companyname}=req.body;
    try {
        const managerSheets=await managerSheet.findAll({where:{companyname:companyname}})

        return res.json({managerSheets})
    } catch (error) {
        console.log(error)
    }
}
const getalluserTimeSheetController = async (req, res) => {
   
    try {

        const existingSheet = await userSheet.findAll();

        if (existingSheet) {
            return res.status(400).json({ alluser:existingSheet });
        }    
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const myUserSheetContoller=async(req,res)=>{
    const {managername}=req.body;
    try {
        const myuserSheet=await userSheet.findAll({where:{managername:managername}})
        if(myuserSheet){
            return res.json({sheet:myuserSheet})
        }
    } catch (error) {
        console.log(error)
    }
}
export { userTimeSheetController,managerTimeSheetController,getuserTimeSheetController,getmanagerTimeSheetController,getalluserTimeSheetController ,myUserSheetContoller,adminManagerSheetController};
