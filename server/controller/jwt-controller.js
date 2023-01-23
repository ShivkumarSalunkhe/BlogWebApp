import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import Token from '../model/token.js';

export const authenticateToken=(request,response,next)=>{
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return response.status(401).json({msg: 'Token Is Missing'})
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY,(error,user)=>{
        if(error){
            return response.status(403).json({msg:'Invalid Token'})
        }
        request.user = user
        next()
    })
}
