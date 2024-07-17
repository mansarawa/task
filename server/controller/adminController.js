import { adminModel, mleaveModel } from "../postgres/postgres.js";
import jwt from 'jsonwebtoken'
const adminController = async (req, res) => {
    const { adminname, companyname, address, gst, email,gender, role, password } = req.body;
    try {
        const existAdmin = await adminModel.findOne({ where: { email: email } })
        if (!existAdmin) {
            const newAdmin = await adminModel.create(req.body);
            return res.status(201).json({ messsage: 'user added success', data: newAdmin })
        }
        return res.status(201).json({ messsage: 'already added ' })
        console.log("start")
    } catch (error) {
        console.log(error)
    }
}

const ladminController = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
    try {
        const findAdmin = await adminModel.findOne({ where: { email: email } })
        if (findAdmin) {
            if (findAdmin.password == password) {

                return res.status(200).json({ message: "Admin login", sucess: true, admin: findAdmin })
            }
            return res.status(401).json({ message: "incorrect password" })
        }
        return res.status(401).json({ message: "not found" })
    } catch (error) {
        console.log(error)
    }
}

const updateAdminController = async (req, res) => {
    const { adminname, companyname, address, gst, email, password, id } = req.body;
    console.log('Received Data:', req.body);
    if (!id) {
        return res.status(400).json({ message: "ID is required", success: false });
    }

    const adminId = parseInt(id, 10);
    if (isNaN(adminId)) {
        return res.status(400).json({ message: "Invalid ID format", success: false });
    }
    try {
        const findAdmin = await adminModel.findOne({ where: { id: id } })
        if (findAdmin) {
            const updateAdmin = await adminModel.update({ adminname, companyname, address, gst, email, password }, { where: { id: id } })
            return res.status(200).json({ message: "update successfull", admin: updateAdmin, success: true })
        }
        return res.status(401).json({ message: "update unsuccessfull", success: false })
    } catch (error) {
        console.log(error)
    }
}

const deleteAdminController = async (req, res) => {
    const { id } = req.body;
    try {
        const findAdmin = await adminModel.findOne({ where: { id: id } })
        if (findAdmin) {
            await findAdmin.destroy();
            return res.status(200).json({ message: "delete successfull", success: true })
        }
        return res.status(401).json({ message: "delete unsuccessfull", success: false })
    } catch (error) {
        console.log(error)
    }
}
const getAdminController = async (req, res) => {
    const {companyname}=req.body
    try {
        
    
    if(!companyname){
        console.log("requird")
    }
    const getAdmin = await adminModel.findAll({where:{companyname:companyname}});
    console.log(getAdmin)
    if(getAdmin){
    return res.status(200).json({ admin: getAdmin })
    }
    else{
        return res.status(400).json({message:"not found"})
    }
} catch (error) {
    console.log(error)
}

}

const getMangerLeaveController = async (req, res) => {
    const getManagerLeave = await mleaveModel.findAll();
    return res.status(200).json({ managerLeave: getManagerLeave })
   
}
const grantManagerLeaveController = async (req, res) => {
    const { id } = req.body;
    try {
        const findLeave = await mleaveModel.findOne({ where: { id: id } })
        if (findLeave) {
            let status = "Grant"
            await mleaveModel.update({ status }, { where: { id: id } });
            return res.status(200).json({ message: "Grant successfull", success: true })
        }
        return res.status(401).json({ message: "error", success: false })
    } catch (error) {
        console.log(error)
    }
}

const denyManagerLeaveController = async (req, res) => {
    const { id } = req.body;
    try {
        const findLeave = await mleaveModel.findOne({ where: { id: id } })
        if (findLeave) {
            let status = "Deny"
            await mleaveModel.update({ status }, { where: { id: id } });
            return res.status(200).json({ message: "Deny", success: true })
        }
        return res.status(401).json({ message: "error", success: false })
    } catch (error) {
        console.log(error)
    }
}
export { adminController, ladminController, updateAdminController, deleteAdminController, getAdminController, grantManagerLeaveController, denyManagerLeaveController, getMangerLeaveController }