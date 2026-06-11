import express from "express";
import dotenv from 'dotenv';
import path from "path"
import cors from 'cors'


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();



const app = express()
const port = process.env.PORT || 5000

const __dirname = path.resolve()


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server started on PORT ${port}`);

    })

})

if (process.env.NODE_ENV !== 'production') {
    app.use(cors(
        { origin: "http://localhost:5173" }
    ))

}
//middleware
app.use(express.json()) // parse json bodies


app.use(ratelimiter) // middleware for rate limiting



app.use('/api/notes/', notesRoutes)

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get('*path', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}