import mongoose from 'mongoose' ; 


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL) ;
        console.log(connect.connection.name) ;
    }
    catch (error) {
        console.error(error) ; 
    }
}