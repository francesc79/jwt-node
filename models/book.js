const objectid = require('objectid');
const books = [];

class Book {
    constructor(book) {
        this.book = {...book, _id: objectid()};    
    }

    save() {
        books.push(this.book);
        return Promise.resolve(this.book);
    }

    static getBooks() {
        return Promise.resolve(books);
    }

    static findById(id) {
        return books.find((book) => book._id === id);
    }
}

function validateBook(book) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(book, schema);
}
  
exports.Book = Book; 
exports.validate = validateBook;