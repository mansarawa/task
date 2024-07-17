import { userLeaveModel } from "../postgres/postgres.js";

const userLeaveController=async(req,res)=>{
    const {username,email,date,status,managername}=req.body;
    console.log("request body"+req.body)
    try {
        
   
    const leave=await userLeaveModel.create({username,email,date,managername});
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