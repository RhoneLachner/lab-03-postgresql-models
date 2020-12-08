require('dotenv').config();
const request = require('supertest');
const { app } = require('./app.js');
// const book = require('./models/Book.js');
// book = new Book();

describe ('', () => {
  it('responds with added book', async() => {
    const res = await request(app)
      .post('/Book')
      .send({
        'title': 'Into the Forest', 
        'author': 'name',
        'url': 'intotheforest.com'
       
      });
    
console.log(res);

    expect(res.body).toEqual({
      'title': 'Into the Forest', 
      'author': 'name',
      'url': 'intotheforest.com'
    });
  });
});
