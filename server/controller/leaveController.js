import { mleaveModel } from "../postgres/postgres.js";

const mLeaveController=async(req,res)=>{
    const {username,email,date,status}=req.body;
    console.log(date)
    try {
        
   
    const {date}=req.body;
    const leave=await mleaveModel.create({username,email,date});
    if(leave){
        return res.status(200).json({message:"leave application sent",leave,success:true})
    }
    else{
        return res.status(400).json({message:"error in  application sent",success:false})

    } } catch (error) {
        console.log(error)
    }

}
export {mLeaveController}