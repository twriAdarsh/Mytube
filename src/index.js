// require("dotenv").config({path :'./env'});
import dotenv from "dotenv";
import connectDb from "./db/index.js";
dotenv.config();

connectDb();



















// import express from "express";
// const app= express();
// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
//         app.on("error", (error) => {
//             console.error("Error", error);
//             throw error;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });

//     } catch (error) {
//         console.error("Error",error);
//         throw error;
//     }
// })