import express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'
import cors from 'cors' 
import {connectDB} from '../lib/db.js'
import authRoutes from '../routes/user.route.js'
import todoRoutes from '../routes/todo.route.js'
const app = express() ; 
dotenv.config() ; 
app.use(express.json()) ; 
app.use(cookieParse());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // cookie / token
}));

app.use("/api/auth", authRoutes) ;
app.use("/api" , todoRoutes)
const port = process.env.PORT || 3000;

app.listen(port , (req ,res) => {
    connectDB() ; 
    console.log(`Listening http://localhost:${port}`) ; 
})

