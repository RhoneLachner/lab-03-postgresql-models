const fs = require('fs');
const request = require('supertest');
// const  response  = require('../lib/utils/app.js');
const app = require('../lib/utils/app.js');
const pool = require('../lib/utils/pool.js');
const Book = require('../models/Book.js');
// book = new Book();


describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  //POST TEST
  it('creates a book with POST', async() => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'Into the Forest', 
        author: 'name',
        url: 'intotheforest.com'       
      });
    
    console.log(res.body);

    expect(res.body).toEqual({
      id: expect.anything(),
      title: 'Into the Forest', 
      author: 'name',
      url: 'intotheforest.com'
    });
  });
  //GET TEST
  it('finds books from table with GET', async() => {
    const res = await request(app)
      .get('/books');

    expect(res.body).toEqual(res.body);
  });
  //GET BY ID TEST
  it('finds books from table by ID with GET', async() => {
    const book = await Book.insert({ title: 'Into the Forest', 
      author: 'name',
      url: 'intotheforest.com' });

    const response = await request(app)
      .get(`/books/${book.id}`);

    // console.log(`/books/${book.id}`);
    expect(response.body).toEqual(book);
  });
  //PUT TEST
  it('updates books from table by ID with PUT', async() => {
    const book = await Book.insert({ 
      title: 'Into the Forest', 
      author: 'name',
      url: 'intotheforest.com' });

    const response = await request(app)
      .put(`/books/${book.id}`)
      .send({
        title: 'Into the OTHER Forest', 
        author: 'OTHER name',
        url: 'intotheforest.com'
      });

    console.log(`/books/${book.id}`);
    expect(response.body).toEqual({
      ...book,
      title: 'Into the OTHER Forest', 
      author: 'OTHER name'
    });
  });
  //DELETE TEST
  it('updates books from table by ID with PUT', async() => {
    const book = await Book.insert({ 
      title: 'Into the Forest', 
      author: 'name',
      url: 'intotheforest.com' });

    const response = await request(app)
      .delete(`/books/${book.id}`);

    console.log(`/books/${book.id}`);
    expect(response.body).toEqual(book);
  });

});
