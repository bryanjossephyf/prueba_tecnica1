import express from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config'
const app = express();
/* import routes */
import bookRoutes from "./routes/books.routes.js"
import authControllers from "./controllers/auth.controllers.js";
import verifyToken from "./middleware/auth.middleares.js";


//middleware
app.use(express.json())
app.use(cookieParser())


/* routes */
app.get("/", (req,res)=>{
    res.status(200).send("Hello word")
})
app.post("/auth", authControllers.authenticate)
app.use("/book",verifyToken, bookRoutes)


//server
const port = process.env.PORT
app.listen(port|| 3000,  ()=>{
    console.log("server on: ", port)
})





