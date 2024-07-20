import { ApiError } from "../error/ApiError.js"
import bcrypt from "bcrypt";
import { User, Basket } from "../models/models.js"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();
//

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SEKRET_KEY, {expiresIn: '24h'})
}


class UserController{
    async registation(req, res, next){
        const {email, password, role} = req.body
        if(!password) {
            return next(ApiError.badRequest("Invalid password "))
        }
        if(!email) {
            return next(ApiError.badRequest("Invalid email "))
        }
        
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req,res, next){
        const {email, password} = req.body
        if(!password) {
            return next(ApiError.badRequest("Invalid password "))
        }
        if(!email) {
            return next(ApiError.badRequest("Invalid email "))
        }
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.badRequest("пользователь не найден "))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest("неверный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }     
}

export const userController = new UserController() 
