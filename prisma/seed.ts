import { db } from "../src/utils/db.server";


type Author = {
    firstName: string;
    lastName: string;
}
type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}


// const authors = await db.author.find();

const getAuthors = (): Array<Author> => {
    return [
        { firstName: "John", lastName: "Doe" },
        { firstName: "Valery", lastName: "Guhena" },
        { firstName: "Williams", lastName: "Shakespeare" },
        { firstName: "Yuval Noa", lastName: "Harari" },
    ]
}

const getBooks = (): Array<Book> => {
    return [
        { title: 'Sapiens', isFiction: false, datePublished: new Date() },
        { title: 'Home Deus', isFiction: false, datePublished: new Date() },
        { title: 'The ugly Duck', isFiction: false, datePublished: new Date() },
        { title: 'New Things', isFiction: false, datePublished: new Date() },
        { title: 'Real life', isFiction: false, datePublished: new Date() },
    ]
}
const seed = async () => {
    const authors = await db.author.findMany();
    if (authors.length === 0) {
        await Promise.all(
            getAuthors().map(author => {
                return db.author.create({
                    data: {
                        firstName: author.firstName,
                        lastName: author.lastName
                    }
                })
            })
        );
    }

    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noa"
        }
    });
    await Promise.all(
        getBooks().map(book => {
            const { title, isFiction, datePublished } = book;
            if (author) {
                const newBook = db.book.create({
                    data: {
                        title, isFiction, datePublished, authorId: author.id
                    }
                });
                return newBook
            }
        })
    )
}
seed();
