import mongoose from "mongoose";
import 'dotenv/config';

try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log('Conected to mongo DB database');    
} catch (error) {
    console.log(`Conection falied ${error}`);
}