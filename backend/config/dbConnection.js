const mongoose =require("mongoose");
module.exports=async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("connected to database");
    } catch (error) {
        console.log("connected failde to database",error);
    }
}