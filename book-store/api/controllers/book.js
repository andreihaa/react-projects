import Book from "../models/Book.js";

export const createBook = async (req,res, next ) => {
    const newBook = new Book(req.body); 
    try{
        const savedBook = await newBook.save();
        res.status(200).json(savedBook)
    }
    catch(err){ 
        next(err)
    }
}
export const updateBook = async (req,res, next ) => {
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {$set: req.body}, { new:true })
        res.status(200).json(updatedBook)
    }
    catch(err){
        next(err)
    }
}

export const deleteBook = async (req,res, next ) => {
    try{
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json("Book has been deleted")
    }
    catch(err){
        next(err)
    }
} 
export const getBook = async (req,res, next ) => {
    try{
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    }
    catch(err){
        next(err)
    }
}
export const getAllBooks = async (req,res, next ) => {
    // const failed = true;

    // if (failed) return next(createError(401, "you are not authenticated!")); 
    try{
        const books = await Book.find(req.query)
        res.status(200).json(books)
    }
    catch(err){
        next(err)
    }
} 