const dotenv = require("dotenv").config();
const URL = `mongodb+srv://kskarthik728:${process.env.Password}@book-store.12qglxy.mongodb.net/books-db?retryWrites=true&w=majority`;

module.exports = { URL };
