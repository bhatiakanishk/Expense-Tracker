//here I am importing the mongoose reference:
import mongoose from 'mongoose';

//this method is going to help us to make a connection with db and allow us to perform operations:
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
}

//here I am making the connection reference public:
export default connectDB;