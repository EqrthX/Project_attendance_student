import {Users} from '../models/attendace.model.js';
import {Op, where} from 'sequelize';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async(req, res) => {
    try {
        
        const {username, password} = req.body;
        
        if(!username || !password) {
            return res.status(400).json({
                message: "required are fields!",
                status: false
            })
        }

        const checkUsername = await Users.findOne({where: {username: username}})

        if(!checkUsername) {
            return res.status(404).json({
                message: "User not found",
                status: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, checkUsername.password)

        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Password not match",
                status: false
            })
        }

        const token = jwt.sign(
            {
                id: checkUsername.id,
                userCode: checkUsername.user_code,
                name: checkUsername.name
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: "3d"
            }
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Login successfully!",
            user: {
                userCode: checkUsername.user_code,
                username: checkUsername.username,
                user_role: checkUsername.user_role,
                name: checkUsername.name,
                password: undefined
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Controller Login error: "+ error,
            status: false
        })
    }
}

export const createUsers = async (req, res) => {
    console.time("start controller createUsers")
    try {

        const {username, name, password, confirmPassword} = req.body;

        if (!username || !name || !password || !confirmPassword) {
            return res.status(400).json({
                message: "required are field!",
                status: false
            })
        }

        let uCode = "T" + Math.floor(Math.random() * 10000).toString().padStart(4, '0')

        const existingUserAndName = await Users.findOne({where: {
            user_code: uCode,
            name: name
        }})

        if (existingUserAndName) {
            return res.status(400).json({
                message: "Users is already",
                status: false
            })
        }

        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const newUser = await Users.create({
            user_code: uCode,
            username: username,
            name: name,
            password: hashPassword
        });

        res.status(201).json({
            message: "Create user successfully",
            status: true,
            content: newUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Controller create user error: " + error,
            status: false
        })
    }
    console.timeEnd("End controller createUsers")
}

export const protectedToken = async(req, res) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message:"Unauthorized Token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        res.json({
            message: "Protected Data",
            user: decoded
        })
    } catch (error) {
        return res.status(403).json({
            message: "Invalid Token"
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "Logout Successfully"
    })
}