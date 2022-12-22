import dotenv from "dotenv"
import express, { Router } from "express"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import booksRoute from "./routes/books.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express(); 
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
      } catch (error) {
        throw error
    }
} 

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

//middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/books", booksRoute)
app.use("/api/users", usersRoute)

app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message ||'Something went wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800, () =>{
    connect()
    console.log("Connected to backend!")
})