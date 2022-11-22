import  express from "express";
import conn from "./config/db.js";
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import auth from "./middelware/auth.js"

dotenv.config()

const app =express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/user",userRouter)

app.listen(process.env.PORT,async()=>{
    await conn;
    console.log(`Server Started on port ${process.env.PORT}`);
})