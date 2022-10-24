import express from "express";
// import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'


import { createAuthor, deleteAuthor, fetAuthorByID, fetchAuthors, updateAuthor } from './author.service'

export const routerAuthor = express.Router();

routerAuthor.get('/', fetchAuthors)
routerAuthor.get('/:id', fetAuthorByID)
routerAuthor.post('/', createAuthor)
routerAuthor.put('/:id', updateAuthor)
routerAuthor.delete('/:id', deleteAuthor)