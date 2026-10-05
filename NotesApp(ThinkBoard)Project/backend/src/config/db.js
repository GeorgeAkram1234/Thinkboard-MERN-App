
import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("mongoDB connected successfully");
        
    } catch (error){
        console.error('mongoDB faileddd' , error);
        process.exit(1)
        
    }
}