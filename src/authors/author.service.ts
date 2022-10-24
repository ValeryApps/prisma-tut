import { db } from "../utils/db.server";

type Author = {
    id: number;
    firstName: any;
    lastName: any;
    createdAt: any
}

export const fetchAuthors = async (req: any, res: any): Promise<Author[]> => {
    try {
        const authors = await db.author.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                books: {
                    select: {
                        title: true,
                        createdAt: true,
                        updatedAt: true,
                        datePublished: true,
                        author: {
                            select: {
                                firstName: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json(authors)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const fetAuthorByID = async (req: any, res: any): Promise<Author | undefined> => {
    const { id } = req.params;

    try {
        const author = await db.author.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json(author);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const createAuthor = async (req: any, res: any) => {
    const { firstName, lastName } = req.body;
    try {
        const newAuthor = await db.author.create({
            data: {
                firstName, lastName
            }
        });
        return res.status(201).json({ newAuthor })
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAuthor = async (req: any, res: any) => {
    const { firstName, lastName } = req.body;
    const id = parseInt(req.params.id);
    try {
        const updatedAuthor = await db.author.update({
            where: {
                id: id
            },
            data: {
                firstName, lastName
            }
        })
        return res.status(200).json(updatedAuthor);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAuthor = async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    try {
        const deletedAuthor = await db.author.delete({
            where: {
                id
            }
        })
        return res.status(200).json(deletedAuthor);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })

    }
}