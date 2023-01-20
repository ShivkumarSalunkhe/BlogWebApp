import User from "../model/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../model/token.js'
dotenv.config();

export const signupUser = async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashPassword
        }

        const newUser = new User(user);
        await newUser.save();
        return res.status(200)
            .json({
                msg: "Signup Successful"
            })
    } catch (error) {
        return res.status(500)
            .json({
                msg: "Error While Signup User"
            })
    }
}


export const loginUser = async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(400)
            .json({
                msg: 'Username Does Not Match'
            })
    }
    try {
        let match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken })
            await newToken.save();
            return res.status(200)
                .json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: user.name,
                    username: user.username
                })
        } else {
            return res.status(400)
                .json({
                    msg: 'Password Does Not Match'
                })
        }
    } catch (error) {
        return res.status(500)
            .json({
                msg: 'Error While Login In User'
            })
    }
}