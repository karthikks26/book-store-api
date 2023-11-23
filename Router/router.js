const mongoose = require("mongoose");
const Book = require("../models/bookModel");
const express = require("express");
const router = express.Router();

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//get book by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      return res.status(404).json({ message: `Book with id ${id} not found` });
    }
    return res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
});

//update book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "Send all the required field" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    return res.status(201).send({ message: "Book Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Book not found" });
  }
});

//delete

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id, req.body);

    return res.status(201).send({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Book not found" });
  }
});
//post

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "Send all the required field" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
