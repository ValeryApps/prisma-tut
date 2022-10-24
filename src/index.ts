import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { routerAuthor } from './authors/author.router'
import { bookRouter } from './books/book.router'
import { commentRouter } from './comments/comment.router'
import { replyRouter } from './replies/reply.router'
dotenv.config()

const PORT = process.env.PORT
const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/authors', routerAuthor)
app.use('/api/books', bookRouter)
app.use('/api/comments', commentRouter)
app.use('/api/reply', replyRouter)

app.listen(PORT, () => { console.log("Server is running on port: ", PORT) }
)