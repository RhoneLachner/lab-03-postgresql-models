const express = require('express');
const app = express();
const Book = require('../../models/Book');

//ENDPOINTS

app.use(express.json());

app.post('/books', (req, res) => {
//   const book = await Book.insert(req.body);
//   res.send(book);
  Book
    .insert(req.body)
    .then(book => res.send(book));

});

app.get('/books', (req, res) => {
  Book
    .find()
    .then(book => res.send(book));
});

app.get('/books/:id', (req, res) => {
  Book
    .findById(req.params.id)
    .then(book => res.send(book));
  
});

app.put('./books/:id', (req, res) => {
  Book
    .update(req.params.id, req.body)
    .then(book => res.send(book));
});

app.delete('./books/:id', (req, res) => {
  Book
    .delete(req.params.id, req.body)
    .then(book => res.send(book));
});


module.exports = app;

