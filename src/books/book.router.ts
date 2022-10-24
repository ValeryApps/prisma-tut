import express from "express";
import { createBook, deleteBook, fetchAllBooks, fetchAuthorBooks, fetchBookById, updateBook } from "./book.service";


export const bookRouter = express.Router();

bookRouter.get('/', fetchAllBooks)
bookRouter.get('/:authorId', fetchAuthorBooks)
bookRouter.get('/book/:id', fetchBookById)
bookRouter.post('/', createBook)
bookRouter.put('/:id', updateBook)
bookRouter.delete('/:id', deleteBook)