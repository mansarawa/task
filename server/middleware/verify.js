import jwt from 'jsonwebtoken'

const verify=async(req,res,next)=>{
    const token=req.header('token');
    if(!token){
        return res.status(401).json({message:"token required",success:false})
    }
    try {    
    if(token){
        const decodeUser=await jwt.verify(token,process.env.JWT_SECRET)
        req.user=decodeUser;
        next()
    }
} catch (error) {
    console.log(error)
}
}
export default  verify