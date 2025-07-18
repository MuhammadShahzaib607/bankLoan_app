import express from "express"
import authRoute from "./routes/authRoute.js"
import loanRoute from "./routes/loanRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/loan", loanRoute)

mongoose.connect(process.env.MONGO_URI)

app.listen("8000", ()=> {
    console.log ("server is running on port 8000")
    console.log (process.env.MONGO_URI)
})