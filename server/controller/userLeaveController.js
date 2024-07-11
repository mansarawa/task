import { userLeaveModel } from "../postgres/postgres.js";

const userLeaveController=async(req,res)=>{
    const {username,email,date,status}=req.body;
    try {
        
   
    const {username,email,date,status}=req.body;
    const leave=await userLeaveModel.create({username,email,date,});
    if(leave){
        return res.status(200).json({message:"leave application sent",success:true})
    }
    else{
        return res.status(400).json({message:"error in  application sent",success:false})

    } } catch (error) {
        console.log(error)
    }

}
export {userLeaveController}