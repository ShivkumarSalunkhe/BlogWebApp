import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();


const Connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while conneting database", error);
    }
}

export default Connection;