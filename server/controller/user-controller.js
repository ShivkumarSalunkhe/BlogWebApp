import User from "../model/user.js"

export const signupUser= async (req, res)=>{
    try {
        const user = req.body
        const newUser = new User(user);
        await newUser.save();
        return res.status(200)
        .json({
            msg:"Signup Successful"
        })
    } catch (error) {
        return res.status(500)
        .jsion({
            msg: "Error while signup user"
        })
    }
}