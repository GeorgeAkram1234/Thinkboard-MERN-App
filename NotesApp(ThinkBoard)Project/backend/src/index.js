import express from "express";
import dotenv from 'dotenv';
import path from "path"
import { fileURLToPath } from "url"
import cors from 'cors'


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";

// Get the actual directory of this file (reliable in ESM, unlike path.resolve() which depends on cwd)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') });



const app = express()
const port = process.env.PORT || 5000

app.set("trust proxy", 1)


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


app.use('/api/notes/', ratelimiter, notesRoutes) // rate limit API requests only

if (process.env.NODE_ENV === "production") {
    // __dirname is backend/src/, so go up two levels to project root, then into frontend/dist
    app.use(express.static(path.join(__dirname, "../../frontend/dist")))

    app.get('*path', (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
    })
}
