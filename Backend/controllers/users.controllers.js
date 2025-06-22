import {Users} from '../models/attendace.model.js';
import {Op, where} from 'sequelize';
import bcrypt from "bcryptjs"

export const getUsers = async(req, res) => {
    try {
        const user = await Users.findAll();

        if (user.length == 0) {
            return res.status(404).json({
                message:"Users not found!",
                status: false
            })
        }
        
        res.status(200).json({
            message:"Show Users successfully",
            status: true,
            content: user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Controller get user error: " + error,
            status: false
        })
    }
}

export const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        if(!id) {
            return res.status(404).json({
                message: `ID not found`,
                status: false
            })
        }

        if(!name) {
            return res.status(404).json({
                message: "required name!",
                status: false
            })
        }

        const user = Users.findByPk(id)

        if(!user) {
            return res.status(404).json({
                message: "User not found",
                status: false
            })
        }

        await Users.update(
            {name: name},
            {where: {
                id: id
            }}
        )

        return res.status(200).json({
            message: "Update user successfully",
            status: false
        })
    } catch (error) {
        return res.status(500).json({
            message: "Controller updateUser Error: "+error,
            status: false
        })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id) {            
            return res.status(400).json({
                message: "ID to delete not found.",
                status: false
            })
        }

        const user = await Users.findByPk(id);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
                status:false
            })
        }

        await user.destroy();

        return res.status(200).json({
            message: "Delete user with ID " + id + " successfully",
            status: false
        })
    } catch (error) {
        return res.status(500).json({
            message: "Controller delete user Error: "+error,
            status: false
        })
    }
}