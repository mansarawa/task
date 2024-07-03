import { where } from "sequelize";
import { managerModel, userModel } from "../postgres/postgres.js";

 const userController=async(req,res)=>{
    const {name,email,password,salary,mangerId,companyname,managerName}=req.body;
    try {
        const existUser=await userModel.findOne({where:{email:email}})
        if(!existUser)
            {                
                
                const newUser=await userModel.create({name,companyname,email,password,salary,mangerId,managerName})
                return res.status(200).json({message:'user created successfully',User:newUser})
            }
            return res.status(400).json({message:'Already created'})
    } catch (error) {
        return res.json({message:error})
    }
}

const luserController=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const findUser=await userModel.findOne({where:{email:email}})
        if(findUser){
            if(findUser.password==password){
                return res.status(200).json({message:"user login success",user:findUser,success:true})
            }
            return res.status(401).json({message:"pass incorrect",success:false})
        }
    } catch (error) {
        console.log(error)
    }
}
const updateUserController=async(req,res)=>{
    const {name,email,password,salary,mangerId,id}=req.body;
    console.log('Received Data:', req.body);
    if (!id) {
        return res.status(400).json({ message: "ID is required", success: false });
    }

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid ID format", success: false });
    }
    try {
        const existUser=await userModel.findOne({where:{email:email}})
        if(existUser)
            {
                const updateUser=await userModel.update({name,email,password,salary,mangerId},{where:{id:id}})
                return res.status(200).json({message:'user updated successfully',User:updateUser})
            }
            return res.status(400).json({message:'dont updated'})
    } catch (error) {
        return res.json({message:error})
    }
}

const deleteUserController = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "ID is required", success: false });
    }
  
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid ID format", success: false });
    }
  
    try {
      const existUser = await userModel.findOne({ where: { id: userId } });
      if (existUser) {
        await existUser.destroy();
        return res.status(200).json({ message: 'User deleted successfully', success: true });
      }
      return res.status(400).json({ message: 'User not found', success: false });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  }
  


const getUserController=async(req,res)=>{
    const getUser=await userModel.findAll();
    return res.status(200).json({user:getUser})
}
export {userController,luserController,updateUserController,deleteUserController,getUserController}