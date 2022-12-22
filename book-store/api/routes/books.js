import express from "express"
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/book.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); 


router.post("/", verifyAdmin, createBook);

router.put("/:id",verifyAdmin, updateBook)

router.delete("/:id", verifyAdmin, deleteBook)

router.get("/:id", getBook)
 
router.get("/", getAllBooks)


export default router; 