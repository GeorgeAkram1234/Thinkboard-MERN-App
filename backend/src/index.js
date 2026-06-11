import express from "express";
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import ratelimiter from "./middleware/ratelimiter.js";
import cors from 'cors'
dotenv.config();

// console.log(process.env.MONGO_URI);


const app = express()
const port = process.env.PORT || 5000


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server started on PORT ${port}`);

    })

})

app.use(cors(
    { origin: "http://localhost:5173" }
))

//middleware
app.use(express.json()) // parse json bodies


app.use(ratelimiter) // middleware for rate limiting


// middlewares are best for auth check,rate limiting

// app.use((req, res , next)=>{
//     console.log(`request method is ${req.method} and request url is ${req.url}`);
//     next()
// })



app.use('/api/notes/', notesRoutes)




