import { adminModel } from "../postgres/postgres.js";
import jwt from 'jsonwebtoken'
const adminController = async (req, res) => {
    const { adminname, companyname, address, gst, email, role, password } = req.body;
    try {
        const existAdminm = await adminModel.findOne({ where: { email: email } })
        if (!existAdminm) {
            const newAdmin = await adminModel.create(req.body);
            return res.status(201).json({ messsage: 'user added success', data: newAdmin })
        }
        return res.status(201).json({ messsage: 'already added ' })
        console.log("start")
    } catch (error) {

    }
}

const ladminController = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body); 
    try {
        const findAdmin = await adminModel.findOne({ where: { email: email } })
        if (findAdmin) {
            if (findAdmin.password == password) {
                const obj={id:findAdmin.id}
                var token =jwt.sign(obj,process.env.JWT_SECRET)
                return res.status(200).json({ message: "Admin login",token:token, sucess: true, admin: findAdmin })
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
    const  {id}  = req.body;
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
    const getAdmin = await adminModel.findAll();
    return res.status(200).json({ admin: getAdmin })
}
export { adminController, ladminController, updateAdminController, deleteAdminController, getAdminController }