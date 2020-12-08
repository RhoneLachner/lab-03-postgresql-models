require ('dotenv').config();
const express = require('express');
const app = express();
const Book = require('./models/Book.js');


//ROUTING!!
app.use(express.json());
const port = 3007;


app.post('/books', async(req, res) => {
//   const book = await Book.insert(req.body);
//   res.send(book);
  Book
    .insert(req.body)
    .then(book => res.send(book));
});

app.get('/books', (req, res) => {
  Book
    .find()
    .then(books => res.send(books));
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

app.listen(port, () => {
  console.log(`started on ${port}`);
});

module.exports = app;
// app.listen();
