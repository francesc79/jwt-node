const objectid = require('objectid');
const Joi = require('Joi');

const books = [{_id: objectid(), name: 'FZA'}];

class Book {
    constructor(book) {
        book = {...book, _id: objectid()};
        Object.assign(this, book);    
    }

    save() {
        return new Promise((resolve, reject) => {
            books.push(this);
            return resolve(this);
        });
    }

    static getBooks() {
        return Promise.resolve(books);
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const book = books.find((book) => book._id === id);
            if (_.isUndefined(book)) {
                reject();
            } else {
                resolve(book);
            }
        })
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