import express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'
import cors from 'cors' 
import path from "path";
import {connectDB} from '../lib/db.js'
import authRoutes from '../routes/user.route.js'
import todoRoutes from '../routes/todo.route.js'
const app = express() ; 
dotenv.config() ; 
app.use(express.json()) ; 
app.use(cookieParse());
app.use(cors({
  origin: ['http://localhost:5173', 'https://todolist-qpwk.onrender.com'],
  credentials: true, // cookie / token
}));
const __dirname = path.resolve();
app.use("/api/auth", authRoutes) ;
app.use("/api" , todoRoutes)
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(port , (req ,res) => {
    connectDB() ; 
    console.log(`Listening http://localhost:${port}`) ; 
})

