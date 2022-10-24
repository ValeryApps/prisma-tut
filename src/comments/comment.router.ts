import express from "express";
import { createComment } from "./comment.service";

export const commentRouter = express.Router();

commentRouter.post('/', createComment);