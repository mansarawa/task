import { managerModel } from "../postgres/postgres.js";
import bcrypt from 'bcrypt'
const managerController = async (req, res) => {
    const { name, email, password, role,companyname } = req.body;
    try {
        const existManager = await managerModel.findOne({ where: { email: email } });
        if (!existManager) {
            const saltRound = 10;
          
            const newManager = await managerModel.create({ name,companyname, email, password: password, role });
            return res.status(200).json({ message: "Manager Created Successfully", manager: newManager });
        }
        return res.status(200).json({ message: "Manager Already Exists" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const lmanagerController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findManager = await managerModel.findOne({ where: { email: email } });

        if (findManager) {
           
            if (findManager.password==password) {
                
                return res.status(200).json({ message: "Manager login", manager: findManager, plainPassword: password , success: true });
            } else {
                return res.status(401).json({ message: "Invalid password", success: false });
            }
        } else {
            return res.status(404).json({ message: "Manager not found", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateManagerController=async(req,res)=>{
    const {name,email,password,role,id}=req.body;
    console.log('Received Data:', req.body);
    if (!id) {
        return res.status(400).json({ message: "ID is required", success: false });
    }

    const managerId = parseInt(id, 10);
    if (isNaN(managerId)) {
        return res.status(400).json({ message: "Invalid ID format", success: false });
    }
    try {
        const existManger=await managerModel.findOne({where:{id:id}})
        if(existManger){
            const updateManager=await managerModel.update({name,email,password,role},{where:{id:id}})
            return res.status(200).json({message:"Manager updated Success",manager:updateManager})
        }
        return res.status(200).json({message:"Manager dont update"})
    } catch (error) {
        console.log(error)
    }
}

const deleteManagerController=async(req,res)=>{
    const {id}=req.body;
    console.log(id)
    try {
        const existManger=await managerModel.findOne({where:{id:id}})
        if(existManger){
            await existManger.destroy();
            return res.status(200).json({message:"Manager delete Success",success:true})
        }
        return res.status(200).json({message:"Manager dont delete"})
    } catch (error) {
        console.log(error)
    }
}
const getManagerController=async(req,res)=>{
    const getManager=await managerModel.findAll();
    return res.status(200).json({manager:getManager})
}

const getManagerNameById = async (managerId) => {
    
    const manager = await managerModel.findByPk(managerId);
    return manager ? manager.name : null;
};
export {managerController,lmanagerController,updateManagerController,deleteManagerController,getManagerController,getManagerNameById}