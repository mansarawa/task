import { managerSheet, userSheet } from "../postgres/postgres.js";
import { Op } from 'sequelize';

const userTimeSheetController = async (req, res) => {
    const { projectname, username, title, desc, timetaken } = req.body;
    try {
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSheet = await userSheet.findOne({
            where: {
                username: username,
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        if (existingSheet) {
            return res.status(400).json({ message: "Timesheet entry for today already exists." });
        }

    
        const createSheet = await userSheet.create(req.body);
        if (createSheet) {
            return res.status(200).json({ sheet: createSheet });
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
            return res.status(400).json({ oneuser:existingSheet });
        }    
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const managerTimeSheetController = async (req, res) => {
    const { projectname, managername, title, desc, timetaken } = req.body;
    try {
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSheet = await managerSheet.findOne({
            where: {
                managername: managername,
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        if (existingSheet) {
            return res.status(400).json({ message: "Timesheet entry for today already exists." });
        }

    
        const createSheet = await managerSheet.create(req.body);
        if (createSheet) {
            return res.status(200).json({ sheet: createSheet });
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
            return res.status(400).json({ onemanager:existingSheet });
        }    
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

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
export { userTimeSheetController,managerTimeSheetController,getuserTimeSheetController,getmanagerTimeSheetController,getalluserTimeSheetController };
