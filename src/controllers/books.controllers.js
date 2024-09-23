import fs from "node:fs";
//db
const data = fs.readFileSync("mock_data.json", "utf-8")
const books = JSON.parse(data)

/* controllers */
class BooksControllers {
    constructor() { }

    getBooks(req, res) {
        try {
            const { price , phrase } = req.query

            /*si se llama a price*/
            // get: /book?price=600 => obtine un libro por precio mayor a x 
            if(price){
                if(isNaN(price)){
                    return res.status(400).json({message: "Price should be a number"})
                }

                const filterBooks = books.filter((book)=> book.price > Number(price))

                if(filterBooks.lenght === 0 ){
                    return res.status(404).json({message: "No books found"})
                }
                
                return res.status(200).json(filterBooks)
            }

            /*si se llama a phrase */
            // get: /book?phrase=al => busca un libro por autor

            if(phrase){
                const regex = /^[A-Za-z]+$/

                if(!phrase || !regex.test(phrase)){
                    return res.status(400).json({message: "Phrase should contain only letters"})
                }

                const filterBookss = books.filter((book)=> {
                    return book.author && book.author.toLowerCase().includes(phrase.toLowerCase())
                })

                if(filterBookss.length === 0){
                    return res.status(404).json({message: "Not books found with the phrase"})
                }

                return res.status(200).json(filterBookss)
            }
            
            // get: book/ => devuelve todos los libros
            res.status(200).json(books)

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    //get: book/1  => busca un libro por ID
    getBookbyId(req, res) {
        try {
            const { id } = req.params
            const bookId = books.find((x) => x.id === id)

            if (bookId) {
                res.status(200).json(bookId)
            } else {
                res.status(400).json("Bad request, ID not found")
            }
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    // post: /book => crea un nuevo libro
    postBook(req, res) {
        const { title, author, price, availability, num_reviews, starts, description } = req.body

        if (!title || !author || !price || !availability || !num_reviews || !starts || !description) {
            return res.status(400).json({ message: "Bad request, invalid data provided" })
        }

        const lastID = Math.max(...books.map((book) => Number(book.id)))

        try {
            const newBook = {
                id: (lastID + 1).toString(),
                title,
                author,
                price,
                availability,
                num_reviews,
                starts,
                description
            }

            books.push(newBook)
            fs.writeFileSync("mock_data.json", JSON.stringify(books, null, 2), "utf-8")

            res.status(201).json({ message: "Create successfull" })

        } catch (error) {
            res.status(400).json({ message: error })
        }


    }

}

export default new BooksControllers()