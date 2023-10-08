import mongoose from "mongoose";

export default async function Connect(){
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
        console.log("error occured");
    }
}