import express from 'express'
import { createReply } from './reply.service';

export const replyRouter = express.Router();

replyRouter.post('/', createReply);