import { db } from "../utils/db.server"

type Book = {
    id: number;
    title: string
}

export const fetchAllBooks = async (req: any, res: any): Promise<Book[]> => {
    try {
        const books = await db.book.findMany({
            select: {
                title: true,
                createdAt: true,
                updatedAt: true,
                datePublished: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });
        return res.status(200).json(books);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const fetchAuthorBooks = async (req: any, res: any): Promise<Book[]> => {
    const authorId = parseInt(req.params.authorId);
    try {
        const books = await db.book.findMany({
            where: {
                authorId
            },
            select: {
                title: true,
                createdAt: true,
                updatedAt: true,
                datePublished: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        return res.status(200).json(books);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const fetchBookById = async (req: any, res: any): Promise<Book | undefined> => {
    const id = parseInt(req.params.id);


    try {
        const book = await db.book.findUnique({
            where: { id },
            select: {
                title: true,
                createdAt: true,
                updatedAt: true,
                datePublished: true,
                comments: {
                    select: {
                        text: true,
                        createdAt: true,
                        commentedBy: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        },
                        replies: {
                            select: {
                                text: true,
                                createdAt: true,
                                repliedBy: {
                                    select: {
                                        firstName: true
                                    }
                                }
                            }
                        }
                    }
                },
                author: {
                    select: {
                        firstName: true,
                        lastName: true,

                    }
                },

            }
        });

        if (!book) return res.status(404).json({ message: "Book not found" });
        return res.status(200).json(book);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const createBook = async (req: any, res: any): Promise<Book> => {
    const { title, authorId } = req.body;
    try {
        const newBook = await db.book.create({
            data: {
                title, authorId, datePublished: new Date()
            }
        });
        return res.status(201).json({ newBook })
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateBook = async (req: any, res: any): Promise<Book> => {
    const { title } = req.body;
    const id = parseInt(req.params.id);
    try {
        const updatedBook = await db.book.update({
            where: {
                id: id
            },
            data: {
                title,
            }
        })
        return res.status(200).json(updatedBook);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteBook = async (req: any, res: any): Promise<Book> => {
    const id = parseInt(req.params.id);
    try {
        const deletedBook = await db.book.delete({
            where: {
                id
            }
        })
        return res.status(200).json(deletedBook);
    } catch (error: any) {
        return res.status(500).json({ message: error.message })

    }
}