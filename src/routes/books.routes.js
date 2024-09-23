import { Router } from "express";
const routes = Router()

import booksControllers from "../controllers/books.controllers.js";



routes.get("/",booksControllers.getBooks)
routes.get("/:id", booksControllers.getBookbyId)
routes.post("/",  booksControllers.postBook)



export default routes
