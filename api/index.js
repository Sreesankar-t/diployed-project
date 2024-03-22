import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const port = process.env.PORT || 6000

import userRouters from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import hotelRouter from './routes/hotelRoutes.js'
import cors from 'cors'
import path from 'path'



connectDB()
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: 'https://diployed-project.onrender.com', credentials: true }))

app.use('/', userRouters)
app.use('/admin', adminRouter)
app.use('/hotel', hotelRouter)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const newPath = path.join(__dirname, "..");
  app.use(express.static(path.join(newPath, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(newPath, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}


// error middleware start
app.use(notFound)
app.use(errorHandler)
// error middleware end

app.listen(port, () => {
  // connectDB()
  console.log(`!connected to backend ${port}`)
})

