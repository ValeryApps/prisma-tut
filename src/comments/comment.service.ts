import { db } from "../utils/db.server";

export const createComment = async (req: any, res: any) => {
    const { text, authorId, bookId } = req.body;
    try {
        const comment = await db.comment.create({
            data: {
                text, authorId, bookId
            }
        })
        return res.status(201).json(comment)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}