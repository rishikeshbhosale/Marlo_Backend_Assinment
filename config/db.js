import mongoose from 'mongoose'
import dotenv from 'dotenv'

            
dotenv.config() 

const conn = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conected to DB"))
.catch(() => console.log("Error in Database"))


export default conn;