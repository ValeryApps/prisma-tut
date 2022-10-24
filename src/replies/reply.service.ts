import { db } from "../utils/db.server";

export const createReply = async (req: any, res: any) => {
    const { text, authorId, commentId } = req.body;
    try {
        const reply = await db.reply.create({
            data: {
                text, authorId, commentId
            }
        })
        return res.status(201).json(reply)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}